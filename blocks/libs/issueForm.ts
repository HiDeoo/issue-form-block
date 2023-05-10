import { type Pair, type Scalar, parse, stringify } from 'yaml'
import { z } from 'zod'

export const ID_VALIDATION_REGEX = /^$|^[\w-_]+$/

export function parseIssueForm(content: string) {
  const yaml = parse(content)

  const { body, ...others } = issueFormSchema.parse(yaml)

  return { elements: body, metadata: others }
}

export function serializeIssueForm(metadata: IssueFormMetadata, elements: IssueFormElement[], validate = false) {
  const issueForm = { ...metadata, body: normalizeIssueFormElements(elements) }

  const isValid = validate ? issueFormSchema.safeParse(issueForm).success : undefined

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

  return { isValid, yaml }
}

export function createCheckboxesElement(): CheckboxesElement {
  return {
    type: 'checkboxes',
    _id: crypto.randomUUID(),
    attributes: { label: 'New checkboxes', options: [{ _id: crypto.randomUUID(), label: 'New option' }] },
  }
}

export function createDropdownElement(): DropdownElement {
  return {
    type: 'dropdown',
    _id: crypto.randomUUID(),
    attributes: { label: 'New dropdown', options: [{ _id: crypto.randomUUID(), label: 'New option' }] },
  }
}

export function createInputElement(): InputElement {
  return { type: 'input', _id: crypto.randomUUID(), attributes: { label: 'New input' } }
}

export function createMarkdownElement(): MarkdownElement {
  return { type: 'markdown', _id: crypto.randomUUID(), attributes: { value: 'New markdown' } }
}

export function createTextareaElement(): TextareaElement {
  return { type: 'textarea', _id: crypto.randomUUID(), attributes: { label: 'New textarea' } }
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

const elementTypes = ['checkboxes', 'dropdown', 'input', 'markdown', 'textarea'] as const

const zNonEmptyString = z.string().trim().min(1)
const zIdProperty = { id: z.string().regex(ID_VALIDATION_REGEX).optional() }
const zCollapasedProperty = { _collapsed: z.boolean().optional() }
const zValidationsProperty = { validations: z.object({ required: z.boolean() }).optional() }

const issueFormMetadataSchema = z.object({
  name: zNonEmptyString,
  description: zNonEmptyString,
  title: z.string().optional(),
  // TODO(HiDeoo)
  // assignees
  // TODO(HiDeoo)
  // labels
})

const checkboxesElementSchema = z
  .object({
    type: z.literal('checkboxes'),
  })
  .extend(zIdProperty)
  .extend(zValidationsProperty)
  .extend({
    attributes: z.object({
      label: zNonEmptyString,
      description: z.string().optional(),
      options: z
        .object({
          label: zNonEmptyString,
        })
        .array()
        .transform((value) => value.map((option) => ({ ...option, _id: crypto.randomUUID() }))),
    }),
  })
  .extend(zCollapasedProperty)
  .transform((value) => ({ ...value, _id: crypto.randomUUID() }))

const dropdownElementSchema = z
  .object({
    type: z.literal('dropdown'),
  })
  .extend(zIdProperty)
  .extend(zValidationsProperty)
  .extend({
    attributes: z.object({
      label: zNonEmptyString,
      description: z.string().optional(),
      multiple: z.boolean().optional(),
      options: zNonEmptyString
        .array()
        .transform((value) => value.map((option) => ({ _id: crypto.randomUUID(), label: option }))),
    }),
  })
  .extend(zCollapasedProperty)
  .transform((value) => ({ ...value, _id: crypto.randomUUID() }))

const inputElementSchema = z
  .object({
    type: z.literal('input'),
  })
  .extend(zIdProperty)
  .extend(zValidationsProperty)
  .extend({
    attributes: z.object({
      label: zNonEmptyString,
      description: z.string().optional(),
      placeholder: z.string().optional(),
      value: z.string().optional(),
    }),
  })
  .extend(zCollapasedProperty)
  .transform((value) => ({ ...value, _id: crypto.randomUUID() }))

const markdownElementSchema = z
  .object({
    type: z.literal('markdown'),
    attributes: z.object({
      value: z.string(),
    }),
  })
  .extend(zCollapasedProperty)
  .transform((value) => ({ ...value, _id: crypto.randomUUID() }))

const textareaElementSchema = z
  .object({
    type: z.literal('textarea'),
  })
  .extend(zIdProperty)
  .extend(zValidationsProperty)
  .extend({
    attributes: z.object({
      label: zNonEmptyString,
      description: z.string().optional(),
      placeholder: z.string().optional(),
      render: z.string().optional(),
      value: z.string().optional(),
    }),
  })
  .extend(zCollapasedProperty)
  .transform((value) => ({ ...value, _id: crypto.randomUUID() }))

const issueFormElementSchema = z.union([
  checkboxesElementSchema,
  dropdownElementSchema,
  inputElementSchema,
  markdownElementSchema,
  textareaElementSchema,
])

const issueFormSchema = z
  .object({
    body: z.array(issueFormElementSchema),
  })
  .merge(issueFormMetadataSchema)

export type IssueForm = z.infer<typeof issueFormSchema>

export type IssueFormElementType = (typeof elementTypes)[number]

export type IssueFormMetadata = z.infer<typeof issueFormMetadataSchema>
export type IssueFormElement = z.infer<typeof issueFormElementSchema>

export type CheckboxesElement = z.infer<typeof checkboxesElementSchema>
export type DropdownElement = z.infer<typeof dropdownElementSchema>
export type InputElement = z.infer<typeof inputElementSchema>
export type MarkdownElement = z.infer<typeof markdownElementSchema>
export type TextareaElement = z.infer<typeof textareaElementSchema>
