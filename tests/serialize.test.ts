import { expect, test } from 'vitest'
import { parse } from 'yaml'

import {
  serializeIssueForm,
  type IssueFormMetadata,
  type RawIssueForm,
  type CheckboxesElement,
  type DropdownElement,
} from '../blocks/libs/issueForm'

test('should not include empty strings', () => {
  const metadata = { ...getTestMetadata(), title: '' }

  const yaml = serializeIssueForm(metadata, [])

  const issueForm = parseIssueForm(yaml)

  expect(issueForm).not.toMatchObject({ title: '' })
})

test('should not include _collapsed properties', () => {
  const yaml = serializeIssueForm(getTestMetadata(), [
    { type: 'input', _collapsed: true, attributes: { label: 'test' } },
    { type: 'markdown', _collapsed: false, attributes: { value: 'test' } },
  ])

  const issueForm = parseIssueForm(yaml)

  expect(issueForm.body).not.toMatchObject([{ _collapsed: true }, { _collapsed: false }])
})

test('should not include _id options properties', () => {
  const yaml = serializeIssueForm(getTestMetadata(), [
    { type: 'checkboxes', attributes: { label: 'test', options: [{ _id: crypto.randomUUID(), label: 'option' }] } },
    { type: 'dropdown', attributes: { label: 'test', options: [{ _id: crypto.randomUUID(), label: 'option' }] } },
  ])

  const issueForm = parseIssueForm(yaml)
  const checkboxesOptionKeys = Object.keys((issueForm.body.at(0) as CheckboxesElement).attributes.options.at(0) ?? {})
  const dropdownOptionKeys = Object.keys((issueForm.body.at(1) as DropdownElement).attributes.options.at(0) ?? {})

  expect(checkboxesOptionKeys.includes('_id')).toBe(false)
  expect(dropdownOptionKeys.includes('_id')).toBe(false)
})

test('should flatten options labels for a dropdown', () => {
  const yaml = serializeIssueForm(getTestMetadata(), [
    {
      type: 'dropdown',
      attributes: {
        label: 'test',
        options: [
          { _id: crypto.randomUUID(), label: 'option 1' },
          { _id: crypto.randomUUID(), label: 'option 2' },
        ],
      },
    },
  ])

  const issueForm = parseIssueForm(yaml)
  const dropdownOptions = (issueForm.body.at(0) as DropdownElement).attributes.options

  expect(dropdownOptions).toEqual(['option 1', 'option 2'])
})

function getTestMetadata(): IssueFormMetadata {
  return { name: 'test name', description: 'test description' }
}

function parseIssueForm(yaml: string) {
  return parse(yaml) as RawIssueForm
}
