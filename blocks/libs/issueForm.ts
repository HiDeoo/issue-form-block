import { nanoid } from 'nanoid'
import { parse } from 'yaml'
import { z } from 'zod'

const zNonEmptyString = z.string().trim().min(1)

const elementTypes = ['checkboxes', 'dropdown', 'input', 'markdown', 'textarea'] as const

const elementWithIdSchema = z.object({
  // TODO(HiDeoo) validation regex
  id: z.string().optional(),
})

const elementWithRequiredValidationSchema = z.object({
  validations: z
    .object({
      required: z.boolean(),
    })
    .optional(),
})

const checkboxElementSchema = z
  .object({
    attributes: z.object({
      description: z.string().optional(),
      label: zNonEmptyString,
      options: z
        .object({
          label: zNonEmptyString,
        })
        .array(),
    }),
    type: z.literal('checkboxes'),
  })
  .merge(elementWithIdSchema)
  .merge(elementWithRequiredValidationSchema)

const dropdownElementSchema = z
  .object({
    attributes: z.object({
      description: z.string().optional(),
      label: zNonEmptyString,
      multiple: z.boolean().optional(),
      options: zNonEmptyString
        .array()
        // TODO(HiDeoo) Handle serialization
        .transform((value) => value.map((option) => ({ id: nanoid(), label: option }))),
    }),
    type: z.literal('dropdown'),
  })
  .merge(elementWithIdSchema)
  .merge(elementWithRequiredValidationSchema)

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
  .merge(elementWithIdSchema)
  .merge(elementWithRequiredValidationSchema)

const markdownElementSchema = z.object({
  attributes: z.object({
    value: z.string(),
  }),
  type: z.literal('markdown'),
})

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
  .merge(elementWithIdSchema)
  .merge(elementWithRequiredValidationSchema)

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

const issueFormElementSchema = z.discriminatedUnion('type', [
  checkboxElementSchema,
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

export function parseIssueForm(content: string) {
  const yaml = parse(content)

  const { body, ...others } = issueFormSchema.parse(yaml)

  return { elements: body, metadata: others }
}

export type IssueFormElementType = (typeof elementTypes)[number]

export type IssueFormMetadata = z.infer<typeof issueFormMetadataSchema>
export type IssueFormElement = z.infer<typeof issueFormElementSchema>

export type CheckboxElement = z.infer<typeof checkboxElementSchema>
export type DropdownElement = z.infer<typeof dropdownElementSchema>
export type InputElement = z.infer<typeof inputElementSchema>
export type MarkdownElement = z.infer<typeof markdownElementSchema>
export type TextareaElement = z.infer<typeof textareaElementSchema>
