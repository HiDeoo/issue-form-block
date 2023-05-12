import { type Pair, type Scalar, parse, stringify } from 'yaml'

import { issueFormElementSchema, type IssueFormElement } from './elements'
import { z, zNonEmptyString, type RefinementCtx, ZodIssueCode } from './validations'

const serializationKeyOrder = [
  'name',
  'label',
  'description',
  'title',
  'body',
  'type',
  'id',
  'attributes',
  'validations',
  'description',
  'placeholder',
  'value',
  'render',
  'multiple',
  'options',
]

const issueFormMetadataSchema = z.object({
  name: zNonEmptyString,
  description: zNonEmptyString,
  title: z.string().optional(),
  // TODO(HiDeoo)
  // assignees
  // TODO(HiDeoo)
  // labels
})

const issueFormSchema = z
  .object({
    body: z.array(issueFormElementSchema),
  })
  .merge(issueFormMetadataSchema)
  .superRefine((issueForm, ctx) => {
    validateIssueForm(issueForm, ctx)
  })

export function parseIssueForm(content: string) {
  const yaml = parse(content)

  const { body, ...others } = issueFormSchema.parse(yaml)

  return { elements: body, metadata: others }
}

export function serializeIssueForm(metadata: IssueFormMetadata, elements: IssueFormElement[]): SerializedIssueForm {
  const issueForm = { ...metadata, body: normalizeIssueFormElements(elements) }

  const validation = issueFormSchema.safeParse(issueForm)
  const isValid = validation.success
  const errors = validation.success
    ? []
    : validation.error.issues.map(({ message, path }) => ({ message, path: path.join('.') }))

  const yaml = stringify(
    issueForm,
    (_key, value) => {
      if (typeof value === 'string' && value.trim().length === 0) {
        return undefined
      }

      return value
    },
    {
      lineWidth: 0,
      sortMapEntries: (a, b) => {
        return (
          serializationKeyOrder.indexOf((a as Pair<Scalar<string>>).key.value) -
          serializationKeyOrder.indexOf((b as Pair<Scalar<string>>).key.value)
        )
      },
    }
  )

  return { isValid, errors, yaml }
}

export function isValidIssueFormPath(path: string, file: string) {
  return path.replace(file, '') === '.github/ISSUE_TEMPLATE'
}

export function isValidIssueFormExtension(file: string) {
  return file.endsWith('.yml') || file.endsWith('.yaml')
}

function normalizeIssueFormElements(elements: IssueFormElement[]) {
  return elements.map((element) => {
    const { _collapsed, _id, ...others } = element

    if (others.type !== 'checkboxes' && others.type !== 'dropdown') {
      return others
    }

    return {
      ...others,
      attributes: {
        ...others.attributes,
        options: others.attributes.options.map((option) => {
          const { _id, ...optionOthers } = option

          if (others.type === 'checkboxes') {
            return optionOthers
          }

          return optionOthers.label
        }),
      },
    }
  })
}

function validateIssueForm(issueForm: IssueForm, ctx: RefinementCtx) {
  // https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/common-validation-errors-when-creating-issue-forms#body-must-contain-at-least-one-non-markdown-field
  const hasNonMarkdownElement = issueForm.body.some((element) => element.type !== 'markdown')

  if (!hasNonMarkdownElement) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'The issue form must contain at least one non-markdown field.',
      path: ['body'],
    })
  }

  const elementIds = new Set<string>()
  const elementLabelsAndIds = new Map<string, Set<string | undefined>>()

  for (const [index, element] of issueForm.body.entries()) {
    // Markdown elements do not have IDs or labels.
    if (element.type === 'markdown') {
      continue
    }

    // https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/common-validation-errors-when-creating-issue-forms#body-must-have-unique-ids
    if (element.id) {
      if (elementIds.has(element.id)) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: `The issue form contains multiple elements with the same identifier: '${element.id}'.`,
          path: ['body', index, 'id'],
        })
      }

      elementIds.add(element.id)
    }

    const labels: string[] = []

    if (element.attributes.label) {
      labels.push(element.attributes.label)
    }

    if (element.type === 'checkboxes' || element.type === 'dropdown') {
      for (const option of element.attributes.options) {
        if (element.type === 'checkboxes') {
          labels.push(option.label)
        }

        // https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/common-validation-errors-when-creating-issue-forms#bodyi-options-must-not-include-the-reserved-word-none
        if (option.label.toLowerCase() === 'none') {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: `The issue form contains an option label with a reserved word: '${option.label}'.`,
            path: ['body', index],
          })
        }
      }
    }

    // https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/common-validation-errors-when-creating-issue-forms#body-must-have-unique-labels
    // https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/common-validation-errors-when-creating-issue-forms#checkboxes-must-have-unique-labels
    for (const label of labels) {
      const isKnownLabel = elementLabelsAndIds.has(label)
      const knownLabelIds = elementLabelsAndIds.get(label)
      const elementId = !element.id || element.id === '' ? undefined : element.id

      // The label is not known yet.
      if (!isKnownLabel || !knownLabelIds) {
        elementLabelsAndIds.set(label, new Set([elementId]))
        continue
      }

      // The label is known but the element ID is not.
      if (!knownLabelIds.has(elementId)) {
        elementLabelsAndIds.set(label, new Set([...knownLabelIds, elementId]))
        continue
      }

      // The label is known and an element with the same ID already exists.
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `The issue form contains multiple elements with the same label: '${label}'.`,
        path: ['body', index],
      })
    }
  }
}

export type IssueForm = z.infer<typeof issueFormSchema>
export type IssueFormMetadata = z.infer<typeof issueFormMetadataSchema>

interface SerializedIssueForm {
  errors: IssueFormError[]
  isValid: boolean
  yaml: string
}

export interface IssueFormError {
  message: string
  path: string
}
