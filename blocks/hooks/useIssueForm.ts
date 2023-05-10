import type { IssueFormElement } from '../libs/issueForm'
import { useElementsStore, type ElementsState } from '../stores/elements'

import { useMetadata } from './useMetadata'

export function useIssueForm() {
  const metadata = useMetadata()
  const elements = useElementsStore(issueFormElementsSelector)

  return { elements, metadata }
}

export function issueFormElementsSelector(state: ElementsState) {
  return state.baseElements.map((element) => state.byId[element._id]) as IssueFormElement[]
}
