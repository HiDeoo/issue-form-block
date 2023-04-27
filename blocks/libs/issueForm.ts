import { parse } from 'yaml'
import { z } from 'zod'

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
      label: z.string(),
      options: z
        .object({
          label: z.string(),
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
      label: z.string(),
      multiple: z.boolean().optional(),
      options: z.string().array(),
    }),
    type: z.literal('dropdown'),
  })
  .merge(elementWithIdSchema)
  .merge(elementWithRequiredValidationSchema)

const inputElementSchema = z
  .object({
    attributes: z.object({
      description: z.string().optional(),
      label: z.string(),
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
      label: z.string(),
      placeholder: z.string().optional(),
      render: z.string().optional(),
      value: z.string().optional(),
    }),
    type: z.literal('textarea'),
  })
  .merge(elementWithIdSchema)
  .merge(elementWithRequiredValidationSchema)

const issueFormDetailsSchema = z.object({
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
  .merge(issueFormDetailsSchema)

export function parseIssueForm(content: string) {
  const yaml = parse(content)

  const { body, ...others } = issueFormSchema.parse(yaml)

  return { body, details: others }
}

export type IssueFormDetails = z.infer<typeof issueFormDetailsSchema>
export type IssueFormElement = z.infer<typeof issueFormElementSchema>