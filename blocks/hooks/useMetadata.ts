import { shallow } from 'zustand/shallow'

import { useMetadataStore, type MetadataState } from '../stores/metadata'

export function useMetadata() {
  return useMetadataStore(selector, shallow)
}

function selector(state: MetadataState) {
  return { description: state.description, name: state.name, title: state.title }
}
