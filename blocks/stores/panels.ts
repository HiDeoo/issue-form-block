import { create } from 'zustand'

export const usePanelsStore = create<PanelsState>()((set) => ({
  selectedPanel: 'editor',
  actions: {
    setSelectedPanel: (selectedPanel) => set({ selectedPanel }),
  },
}))

export interface PanelsState {
  selectedPanel: Panel
  actions: {
    setSelectedPanel: (selectedPanel: Panel) => void
  }
}

type Panel = 'editor' | 'preview'
