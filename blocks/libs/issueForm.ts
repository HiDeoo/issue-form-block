import { parse, stringify } from 'yaml'
import { z } from 'zod'

export const ID_VALIDATION_REGEX = /^$|[\w-_]+$/

export function parseIssueForm(content: string): IssueForm {
  const yaml = parse(content)

  const { body, ...others } = issueFormSchema.parse(yaml)

  return { elements: body, metadata: others }
}

export function serializeIssueForm(metadata: IssueFormMetadata, elements: IssueFormElement[]) {
  const issueForm = { ...metadata, body: normalizeIssueFormElements(elements) }

  issueFormSchema.parse(issueForm)

  return stringify(
    issueForm,
    (_key, value) => {
      if (typeof value === 'string' && value.trim().length === 0) {
        return undefined
      }

      return value
    },
    { lineWidth: 0 }
  )
}

function normalizeIssueFormElements(elements: IssueFormElement[]) {
  return elements.map((element) => {
    const { _collapsed, ...others } = element

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

const markdownElementSchema = z
  .object({
    type: z.literal('markdown'),
    attributes: z.object({
      value: z.string(),
    }),
  })
  .extend(zCollapasedProperty)

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

const issueFormElementSchema = z.discriminatedUnion('type', [
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

export type RawIssueForm = z.infer<typeof issueFormSchema>

export interface IssueForm {
  elements: IssueFormElement[]
  metadata: IssueFormMetadata
}

export type IssueFormElementType = (typeof elementTypes)[number]

export type IssueFormMetadata = z.infer<typeof issueFormMetadataSchema>
export type IssueFormElement = z.infer<typeof issueFormElementSchema>

export type CheckboxesElement = z.infer<typeof checkboxesElementSchema>
export type DropdownElement = z.infer<typeof dropdownElementSchema>
export type InputElement = z.infer<typeof inputElementSchema>
export type MarkdownElement = z.infer<typeof markdownElementSchema>
export type TextareaElement = z.infer<typeof textareaElementSchema>
