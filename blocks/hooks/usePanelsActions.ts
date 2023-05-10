import { usePanelsStore, type PanelsState } from '../stores/panels'

export function usePanelsActions() {
  return usePanelsStore(selector)
}

function selector(state: PanelsState) {
  return state.actions
}
