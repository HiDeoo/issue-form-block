import { expect, test } from 'vitest'

import { serializeIssueForm } from '../blocks/libs/issueForm'

import { getTestElememt, getTestMetadata, parseTestIssueForm } from './utils'

test('should return yaml for an invalid issue form', () => {
  const metadata = getTestMetadata()

  const { isValid, yaml } = serializeIssueForm(metadata, [])

  expect(isValid).toBe(false)

  const issueForm = parseTestIssueForm(yaml)

  expect(issueForm.name).toBe(metadata.name)
  expect(issueForm.description).toBe(metadata.description)
})

test('should not validate an issue form with no non-markdown elements', () => {
  let issueForm = serializeIssueForm(getTestMetadata(), [])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual({
    message: 'The issue form must contain at least one non-markdown field.',
    path: 'body',
  })

  issueForm = serializeIssueForm(getTestMetadata(), [getTestElememt('markdown', { attributes: { value: 'test' } })])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual({
    message: 'The issue form must contain at least one non-markdown field.',
    path: 'body',
  })

  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('markdown', { attributes: { value: 'test' } }),
    getTestElememt('input', { attributes: { label: 'test' } }),
  ])

  expect(issueForm.isValid).toBe(true)
})

test('should not validate an issue form with elements havint the same identifier', () => {
  const id = 'test-input'

  let issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { id, attributes: { label: 'test 1' } }),
    getTestElememt('input', { id, attributes: { label: 'test 2' } }),
  ])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual({
    message: `The issue form contains multiple elements with the same identifier: '${id}'.`,
    path: 'body.1.id',
  })

  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { id: `${id}-1`, attributes: { label: 'test 1' } }),
    getTestElememt('input', { id: `${id}-2`, attributes: { label: 'test 2' } }),
  ])

  expect(issueForm.isValid).toBe(true)
})
