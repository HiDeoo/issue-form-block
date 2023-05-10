import type { IssueFormElement } from '../libs/issueForm'
import { useElementsStore, type ElementsState } from '../stores/elements'

import { useMetadata } from './useMetadata'

export function useIssueForm() {
  const metadata = useMetadata()
  const { baseElements, byId } = useElementsStore(selector)

  return {
    elements: baseElements.map((element) => byId[element._id]) as IssueFormElement[],
    metadata,
  }
}

function selector(state: ElementsState) {
  return { baseElements: state.baseElements, byId: state.byId }
}
