import { useMetadataStore, type MetadataState } from '../stores/metadata'

export function useMetadataActions() {
  return useMetadataStore(selector)
}

function selector(state: MetadataState) {
  return state.actions
}
