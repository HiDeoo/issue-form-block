import { nanoid } from 'nanoid'
import { parse } from 'yaml'
import { z } from 'zod'

export function parseIssueForm(content: string): IssueForm {
  const yaml = parse(content)

  const { body, ...others } = issueFormSchema.parse(yaml)

  return { elements: body, metadata: others }
}

const elementTypes = ['checkboxes', 'dropdown', 'input', 'markdown', 'textarea'] as const

const zNonEmptyString = z.string().trim().min(1)
const zIdProperty = { id: z.string().optional() } // TODO(HiDeoo) validation regex
const zCollapasedProperty = { _collapsed: z.boolean().optional() } // TODO(HiDeoo) handle serialization
const zValidationsProperty = { validations: z.object({ required: z.boolean() }).optional() }

const issueFormMetadataSchema = z.object({
  // TODO(HiDeoo)
  // assignees
  description: z.string(),
  // TODO(HiDeoo)
  // labels
  name: z.string(),
  // TODO(HiDeoo)
  // title
})

const checkboxesElementSchema = z
  .object({
    attributes: z.object({
      description: z.string().optional(),
      label: zNonEmptyString,
      options: z
        .object({
          label: zNonEmptyString,
        })
        .array()
        // TODO(HiDeoo) Handle serialization
        .transform((value) => value.map((option) => ({ ...option, _id: nanoid() }))),
    }),
    type: z.literal('checkboxes'),
  })
  .extend(zIdProperty)
  .extend(zCollapasedProperty)
  .extend(zValidationsProperty)

const dropdownElementSchema = z
  .object({
    attributes: z.object({
      description: z.string().optional(),
      label: zNonEmptyString,
      multiple: z.boolean().optional(),
      options: zNonEmptyString
        .array()
        // TODO(HiDeoo) Handle serialization
        .transform((value) => value.map((option) => ({ _id: nanoid(), label: option }))),
    }),
    type: z.literal('dropdown'),
  })
  .extend(zIdProperty)
  .extend(zCollapasedProperty)
  .extend(zValidationsProperty)

const inputElementSchema = z
  .object({
    attributes: z.object({
      description: z.string().optional(),
      label: zNonEmptyString,
      placeholder: z.string().optional(),
      value: z.string().optional(),
    }),
    type: z.literal('input'),
  })
  .extend(zIdProperty)
  .extend(zCollapasedProperty)
  .extend(zValidationsProperty)

const markdownElementSchema = z
  .object({
    attributes: z.object({
      value: z.string(),
    }),
    type: z.literal('markdown'),
  })
  .extend(zCollapasedProperty)

const textareaElementSchema = z
  .object({
    attributes: z.object({
      description: z.string().optional(),
      label: zNonEmptyString,
      placeholder: z.string().optional(),
      render: z.string().optional(),
      value: z.string().optional(),
    }),
    type: z.literal('textarea'),
  })
  .extend(zIdProperty)
  .extend(zCollapasedProperty)
  .extend(zValidationsProperty)

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
