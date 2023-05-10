import { create } from 'zustand'

import type { IssueFormMetadata } from '../libs/issueForm'

const initialState: IssueFormMetadata = { description: '', name: '' }

export const useMetadataStore = create<MetadataState>()((set) => ({
  ...initialState,
  original: initialState,
  actions: {
    resetMetadata: () =>
      set((state) => ({ ...state.original, actions: state.actions, original: state.original }), true),
    setMetadata: (metadata) => set(metadata),
    setOriginalMetadata: (metadata) => set({ ...metadata, original: metadata }),
  },
}))

export interface MetadataState extends IssueFormMetadata {
  original: IssueFormMetadata
  actions: {
    resetMetadata: () => void
    setMetadata: (metadata: Partial<IssueFormMetadata>) => void
    setOriginalMetadata: (metadata: IssueFormMetadata) => void
  }
}
