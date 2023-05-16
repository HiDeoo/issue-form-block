import { parse } from 'yaml'

import type { IssueFormElement } from '../blocks/libs/elements'
import type { IssueForm, IssueFormMetadata } from '../blocks/libs/issueForm'

export function getTestMetadata(metadata: Partial<IssueFormMetadata> = {}): IssueFormMetadata {
  return { assignees: [], description: 'test description', name: 'test name', ...metadata }
}

export function getTestElememt<TElement extends IssueFormElement, TType extends TElement['type']>(
  type: TType,
  content: Partial<TElement>
): TElement {
  return { type, _id: crypto.randomUUID(), ...content } as TElement
}

export function parseTestIssueForm(yaml: string) {
  return parse(yaml) as IssueForm
}
