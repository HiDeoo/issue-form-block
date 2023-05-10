import { useElementsStore, type ElementsState } from '../stores/elements'

export function useElements() {
  return useElementsStore(selector)
}

function selector(state: ElementsState) {
  return state.baseElements
}
