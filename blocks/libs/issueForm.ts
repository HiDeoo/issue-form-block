import { type Pair, type Scalar, parse, stringify } from 'yaml'

import { issueFormElementSchema, type IssueFormElement } from './elements'
import { z, zNonEmptyString } from './validations'

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
