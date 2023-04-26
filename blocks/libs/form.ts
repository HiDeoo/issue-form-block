import { parse } from 'yaml'
import { z } from 'zod'

const elementWithIdSchema = z.object({
  // TODO(HiDeoo) validation regex
  // FIXME(HiDeoo)
  id: z.string(), //.optional(),
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

const issueFormSchema = z.object({
  // TODO(HiDeoo)
  // assignees
  // TODO(HiDeoo)
  body: z.array(
    z.discriminatedUnion('type', [
      checkboxElementSchema,
      dropdownElementSchema,
      inputElementSchema,
      markdownElementSchema,
      textareaElementSchema,
    ])
  ),
  description: z.string(),
  // TODO(HiDeoo)
  // labels
  name: z.string(),
  // TODO(HiDeoo)
  // title
})

export function parseIssueForm(content: string) {
  // TODO(HiDeoo) error handling
  const yaml = parse(content)

  // TODO(HiDeoo) error handling
  return issueFormSchema.parse(yaml)
}
