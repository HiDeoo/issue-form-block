import { expect, test } from 'vitest'

import type { CheckboxesElement, DropdownElement, InputElement, TextareaElement } from '../blocks/libs/elements'
import { serializeIssueForm } from '../blocks/libs/issueForm'

import { getTestElememt, getTestMetadata, parseTestIssueForm } from './utils'

test('should not include empty strings', () => {
  const metadata = { ...getTestMetadata(), title: '' }

  const { yaml } = serializeIssueForm(metadata, [])

  const issueForm = parseTestIssueForm(yaml)

  expect(issueForm).not.toMatchObject({ title: '' })
})

test('should not include _collapsed properties', () => {
  const { yaml } = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { _collapsed: true, attributes: { label: 'test' } }),
    getTestElememt('markdown', { _collapsed: false, attributes: { value: 'test' } }),
  ])

  const issueForm = parseTestIssueForm(yaml)

  expect(issueForm.body).not.toMatchObject([{ _collapsed: true }, { _collapsed: false }])
})

test('should not include _id properties', () => {
  const { yaml } = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { _collapsed: true, attributes: { label: 'test' } }),
    getTestElememt('textarea', { _collapsed: false, attributes: { value: 'test' } }),
  ])

  const issueForm = parseTestIssueForm(yaml)
  const checkboxes = issueForm.body.at(0) as InputElement
  const dropdown = issueForm.body.at(1) as TextareaElement

  expect(Object.keys(checkboxes).includes('_id')).toBe(false)
  expect(Object.keys(dropdown).includes('_id')).toBe(false)
})

test('should not include _id options properties', () => {
  const { yaml } = serializeIssueForm(getTestMetadata(), [
    getTestElememt('checkboxes', {
      attributes: { label: 'test', options: [{ _id: crypto.randomUUID(), label: 'option' }] },
    }),
    getTestElememt('dropdown', {
      attributes: { label: 'test', options: [{ _id: crypto.randomUUID(), label: 'option' }] },
    }),
  ])

  const issueForm = parseTestIssueForm(yaml)
  const checkboxes = issueForm.body.at(0) as CheckboxesElement
  const dropdown = issueForm.body.at(1) as DropdownElement
  const checkboxesOptionKeys = Object.keys(checkboxes.attributes.options.at(0) ?? {})
  const dropdownOptionKeys = Object.keys(dropdown.attributes.options.at(0) ?? {})

  expect(checkboxesOptionKeys.includes('_id')).toBe(false)
  expect(dropdownOptionKeys.includes('_id')).toBe(false)
})

test('should flatten options labels for a dropdown', () => {
  const { yaml } = serializeIssueForm(getTestMetadata(), [
    getTestElememt('dropdown', {
      attributes: {
        label: 'test',
        options: [
          { _id: crypto.randomUUID(), label: 'option 1' },
          { _id: crypto.randomUUID(), label: 'option 2' },
        ],
      },
    }),
  ])

  const issueForm = parseTestIssueForm(yaml)
  const dropdownOptions = (issueForm.body.at(0) as DropdownElement).attributes.options

  expect(dropdownOptions).toEqual(['option 1', 'option 2'])
})

test('should flatten properties and not include _id properties', () => {
  const assignee0 = 'assignee 1'
  const assignee1 = 'assignee 2'

  const { yaml } = serializeIssueForm(
    getTestMetadata({
      assignees: [
        { _id: crypto.randomUUID(), text: assignee0 },
        { _id: crypto.randomUUID(), text: assignee1 },
      ],
    }),
    [getTestElememt('input', { attributes: { label: 'test' } })]
  )

  const issueForm = parseTestIssueForm(yaml)

  expect(Array.isArray(issueForm.assignees)).toBe(true)
  expect(issueForm.assignees.at(0)).toBe(assignee0)
  expect(issueForm.assignees.at(1)).toBe(assignee1)
})
