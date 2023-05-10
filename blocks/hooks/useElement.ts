import { useCallback } from 'react'

import type { IssueFormElement } from '../libs/issueForm'
import { useElementsStore } from '../stores/elements'

export function useElement<TType extends IssueFormElement['type']>(
  id: IssueFormElement['_id'],
  type: TType
): Extract<IssueFormElement, { type: TType }> {
  const element = useElementsStore(useCallback((state) => state.byId[id], [id]))

  if (!element || element.type !== type) {
    throw new Error(`Element with id '${id}' and type '${type}' does not exist.`)
  }

  return element as Extract<IssueFormElement, { type: TType }>
}
