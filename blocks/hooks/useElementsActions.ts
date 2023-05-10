import { useElementsStore, type ElementsState } from '../stores/elements'

export function useElementsActions() {
  return useElementsStore(selector)
}

function selector(state: ElementsState) {
  return state.actions
}
