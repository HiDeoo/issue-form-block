import { expect, test } from 'vitest'

import type { CheckboxesElement, DropdownElement } from '../blocks/libs/elements'
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

  expect(Object.keys(checkboxes).includes('_id')).toBe(false)
  expect(Object.keys(dropdown).includes('_id')).toBe(false)

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
