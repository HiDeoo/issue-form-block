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

test('should not validate an issue form with elements having the same ids', () => {
  const id = 'test-id'

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

test('should not validate an issue form with elements having the same labels and no different ids', () => {
  const label = 'test-label'

  function getExpectedError(elementIndex = 1) {
    return {
      message: `The issue form contains multiple elements with the same label: '${label}'.`,
      path: `body.${elementIndex}.attributes.label`,
    }
  }

  // No ids.
  let issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { attributes: { label } }),
    getTestElememt('input', { attributes: { label } }),
  ])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedError())

  // Two identical ids.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { id: 'test-id', attributes: { label } }),
    getTestElememt('input', { id: 'test-id', attributes: { label } }),
  ])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedError())

  // Two different ids.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { id: 'input-1', attributes: { label } }),
    getTestElememt('input', { id: 'input-2', attributes: { label } }),
  ])

  expect(issueForm.isValid).toBe(true)

  // One id and one unspecified id.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { id: 'input-1', attributes: { label } }),
    getTestElememt('input', { attributes: { label } }),
  ])

  expect(issueForm.isValid).toBe(true)

  // One id and another one unspecified id.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { attributes: { label } }),
    getTestElememt('input', { id: 'input-2', attributes: { label } }),
  ])

  expect(issueForm.isValid).toBe(true)

  // One id and two unspecified id.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { id: 'input-1', attributes: { label } }),
    getTestElememt('input', { attributes: { label } }),
    getTestElememt('input', { attributes: { label } }),
  ])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedError(2))

  // One id and two other identical ids.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { id: 'input-1', attributes: { label } }),
    getTestElememt('input', { id: 'input-2', attributes: { label } }),
    getTestElememt('input', { id: 'input-2', attributes: { label } }),
  ])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedError(2))

  // Two different ids and another one unspecified id.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { id: 'input-1', attributes: { label } }),
    getTestElememt('input', { attributes: { label } }),
    getTestElememt('input', { id: 'input-3', attributes: { label } }),
  ])

  expect(issueForm.isValid).toBe(true)

  // Three different ids.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { id: 'input-1', attributes: { label } }),
    getTestElememt('input', { id: 'input-2', attributes: { label } }),
    getTestElememt('input', { id: 'input-3', attributes: { label } }),
  ])

  expect(issueForm.isValid).toBe(true)

  // Two different labels.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { attributes: { label: `${label}-1` } }),
    getTestElememt('input', { attributes: { label: `${label}-2` } }),
  ])

  expect(issueForm.isValid).toBe(true)
})
