import { create } from 'zustand'

import type { IssueFormMetadata } from '../libs/issueForm'

const initialState: IssueFormMetadata = {
  assignees: [],
  description: 'A new issue form.',
  name: 'New issue form',
}

export const useMetadataStore = create<MetadataState>()((set) => ({
  ...initialState,
  actions: {
    setMetadata: (metadata) => set(metadata),
    setOriginalMetadata: (metadata) => set((state) => ({ actions: state.actions, ...metadata }), true),
  },
}))

export interface MetadataState extends IssueFormMetadata {
  actions: {
    setMetadata: (metadata: Partial<IssueFormMetadata>) => void
    setOriginalMetadata: (metadata: IssueFormMetadata) => void
  }
}
