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

  // No ids.
  let issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { attributes: { label } }),
    getTestElememt('input', { attributes: { label } }),
  ])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedDuplicatedLabelError(label, 1))

  // Two identical ids.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { id: 'test-id', attributes: { label } }),
    getTestElememt('input', { id: 'test-id', attributes: { label } }),
  ])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedDuplicatedLabelError(label, 1))

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
  expect(issueForm.errors).toContainEqual(getExpectedDuplicatedLabelError(label, 2))

  // One id and two other identical ids.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { id: 'input-1', attributes: { label } }),
    getTestElememt('input', { id: 'input-2', attributes: { label } }),
    getTestElememt('input', { id: 'input-2', attributes: { label } }),
  ])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedDuplicatedLabelError(label, 2))

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

test('should not validate an issue form with checkboxes having the same option labels among its peers', () => {
  const optionLabel = 'test-option-label'

  let issueForm = serializeIssueForm(getTestMetadata(), [
    getTestCheckboxesElement({ optionLabels: [optionLabel, optionLabel] }),
  ])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedDuplicatedLabelError(optionLabel))

  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestCheckboxesElement({ optionLabels: ['test-option-label-1', 'test-option-label-2'] }),
  ])

  expect(issueForm.isValid).toBe(true)
})

test('should not validate an issue form with checkboxes having the same option labels and no different ids among other input types', () => {
  const optionLabel = 'test-option-label'

  // Two identical option labels in two different checkboxes.
  let issueForm = serializeIssueForm(getTestMetadata(), [
    getTestCheckboxesElement({ label: 'test-label-1', optionLabels: [optionLabel] }),
    getTestCheckboxesElement({ label: 'test-label-2', optionLabels: [optionLabel] }),
  ])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedDuplicatedLabelError(optionLabel, 1))

  // An option label identical to the label of another input type.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestCheckboxesElement({ optionLabels: [optionLabel] }),
    getTestElememt('input', { attributes: { label: optionLabel } }),
  ])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedDuplicatedLabelError(optionLabel, 1))

  // Two identical option labels in two different checkboxes with different ids.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestCheckboxesElement({ id: 'checkboxes-1', optionLabels: [optionLabel] }),
    getTestCheckboxesElement({ id: 'checkboxes-2', optionLabels: [optionLabel] }),
  ])

  expect(issueForm.isValid).toBe(true)

  // An option label identical to the label of another input type with different ids.
  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestCheckboxesElement({ optionLabels: [optionLabel] }),
    getTestElememt('input', { id: 'input-1', attributes: { label: optionLabel } }),
  ])

  expect(issueForm.isValid).toBe(true)
})

test('should not validate an issue form with option labels using a reserved keyword', () => {
  let issueForm = serializeIssueForm(getTestMetadata(), [getTestCheckboxesElement({ optionLabels: ['None'] })])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedInvalidOptionLabelError('None'))

  issueForm = serializeIssueForm(getTestMetadata(), [getTestCheckboxesElement({ optionLabels: ['none'] })])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedInvalidOptionLabelError('none'))

  issueForm = serializeIssueForm(getTestMetadata(), [getTestCheckboxesElement({ optionLabels: ['NOnE'] })])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedInvalidOptionLabelError('NOnE'))

  issueForm = serializeIssueForm(getTestMetadata(), [getTestCheckboxesElement({ optionLabels: ['test'] })])

  expect(issueForm.isValid).toBe(true)
})

test('should not validate an issue form with elements having too similar labels and no different ids', () => {
  let issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { attributes: { label: 'Name?' } }),
    getTestElememt('input', { attributes: { label: 'Name????' } }),
  ])

  expect(issueForm.isValid).toBe(false)
  expect(issueForm.errors).toContainEqual(getExpectedDuplicatedLabelError('Name????', 1))

  issueForm = serializeIssueForm(getTestMetadata(), [
    getTestElememt('input', { id: 'input-1', attributes: { label: 'Name?' } }),
    getTestElememt('input', { id: 'input-2', attributes: { label: 'Name????' } }),
  ])

  expect(issueForm.isValid).toBe(true)
})

function getTestCheckboxesElement({
  id,
  label = 'test-label',
  optionLabels,
}: {
  id?: string
  label?: string
  optionLabels: string[] | readonly string[]
}) {
  return getTestElememt('checkboxes', {
    attributes: {
      label,
      options: optionLabels.map((optionLabel) => ({ _id: crypto.randomUUID(), label: optionLabel })),
    },
    id,
  })
}

function getExpectedDuplicatedLabelError(label: string, elementIndex = 0) {
  return {
    message: `The issue form contains multiple elements with identical or too similar labels: '${label}'.`,
    path: `body.${elementIndex}`,
  }
}

function getExpectedInvalidOptionLabelError(label: string, elementIndex = 0) {
  return {
    message: `The issue form contains an option label with a reserved word: '${label}'.`,
    path: `body.${elementIndex}`,
  }
}
