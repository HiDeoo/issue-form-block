import { z, zNonEmptyString } from './validations'

export const ELEMENT_ID_VALIDATION_REGEX = /^$|^[\w-_]+$/

const elementTypes = ['checkboxes', 'dropdown', 'input', 'markdown', 'textarea'] as const

const _zCollapsed = { _collapsed: z.boolean().optional() }
const zId = { id: z.string().regex(ELEMENT_ID_VALIDATION_REGEX).optional() }
const zValidations = { validations: z.object({ required: z.boolean() }).optional() }

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
        .transform((value) => value.map((option) => ({ ...option, _id: crypto.randomUUID() }))),
    }),
    type: z.literal('checkboxes'),
  })
  .extend(zId)
  .extend(zValidations)
  .extend(_zCollapsed)
  .transform((value) => ({ ...value, _id: crypto.randomUUID() }))

const dropdownElementSchema = z
  .object({
    attributes: z.object({
      description: z.string().optional(),
      label: zNonEmptyString,
      multiple: z.boolean().optional(),
      options: zNonEmptyString
        .array()
        .transform((value) => value.map((option) => ({ _id: crypto.randomUUID(), label: option }))),
    }),
    type: z.literal('dropdown'),
  })
  .extend(zId)
  .extend(zValidations)
  .extend(_zCollapsed)
  .transform((value) => ({ ...value, _id: crypto.randomUUID() }))

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
  .extend(zId)
  .extend(zValidations)
  .extend(_zCollapsed)
  .transform((value) => ({ ...value, _id: crypto.randomUUID() }))

const markdownElementSchema = z
  .object({
    attributes: z.object({
      value: z.string(),
    }),
    type: z.literal('markdown'),
  })
  .extend(_zCollapsed)
  .transform((value) => ({ ...value, _id: crypto.randomUUID() }))

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
  .extend(zId)
  .extend(zValidations)
  .extend(_zCollapsed)
  .transform((value) => ({ ...value, _id: crypto.randomUUID() }))

export const issueFormElementSchema = z.union([
  checkboxesElementSchema,
  dropdownElementSchema,
  inputElementSchema,
  markdownElementSchema,
  textareaElementSchema,
])

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
  return {
    type: 'input',
    _id: crypto.randomUUID(),
    attributes: { label: 'New input' },
  }
}

export function createMarkdownElement(): MarkdownElement {
  return {
    type: 'markdown',
    _id: crypto.randomUUID(),
    attributes: { value: 'New markdown' },
  }
}

export function createTextareaElement(): TextareaElement {
  return {
    type: 'textarea',
    _id: crypto.randomUUID(),
    attributes: { label: 'New textarea' },
  }
}

export type IssueFormElement = z.infer<typeof issueFormElementSchema>
export type IssueFormElementType = (typeof elementTypes)[number]

export type CheckboxesElement = z.infer<typeof checkboxesElementSchema>
export type DropdownElement = z.infer<typeof dropdownElementSchema>
export type InputElement = z.infer<typeof inputElementSchema>
export type MarkdownElement = z.infer<typeof markdownElementSchema>
export type TextareaElement = z.infer<typeof textareaElementSchema>
