import { shallow } from 'zustand/shallow'

import { useMetadataStore, type MetadataState } from '../stores/metadata'

export function useMetadata() {
  return useMetadataStore(selector, shallow)
}

function selector(state: MetadataState) {
  return {
    assignees: state.assignees,
    description: state.description,
    labels: state.labels,
    name: state.name,
    title: state.title,
  }
}
