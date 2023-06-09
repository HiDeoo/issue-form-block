import { create } from 'zustand'

import type { IssueFormElement } from '../libs/elements'

export const useElementsStore = create<ElementsState>()((set) => ({
  baseElements: [],
  byId: {},
  actions: {
    addElement: (element) =>
      set((state) => ({
        baseElements: [...state.baseElements, { _id: element._id, type: element.type }],
        byId: { ...state.byId, [element._id]: element },
      })),
    deleteElement: (elementId) =>
      set((state) => ({
        baseElements: state.baseElements.filter((element) => element._id !== elementId),
        byId: { ...state.byId, [elementId]: undefined },
      })),
    setElement: (element) => set((state) => ({ byId: { ...state.byId, [element._id]: element } })),
    setElementsCollapsed: (collapsed) =>
      set((state) => ({
        byId: Object.fromEntries(
          Object.entries(state.byId).map(([elementId, element]) => [elementId, { ...element, _collapsed: collapsed }])
        ),
      })),
    setElementsOrder: (baseElements) => set({ baseElements }),
    setOriginalElements: (elements) => {
      const baseElements: ElementsState['baseElements'] = []

      const byId = Object.fromEntries(
        elements.map((element) => {
          baseElements.push({ _id: element._id, type: element.type })

          return [element._id, element]
        })
      )

      return set({ baseElements, byId })
    },
    toggleCollapseElement: (elementId) =>
      set((state) => {
        const element = state.byId[elementId]

        if (!element) {
          return state
        }

        return {
          byId: {
            ...state.byId,
            [elementId]: {
              ...element,
              _collapsed: !element._collapsed,
            },
          },
        }
      }),
  },
}))

export interface ElementsState {
  baseElements: BaseElement[]
  byId: Record<IssueFormElement['_id'], IssueFormElement>
  actions: {
    addElement: (elementId: IssueFormElement) => void
    deleteElement: (elementId: IssueFormElement['_id']) => void
    setElement: (element: IssueFormElement) => void
    setElementsCollapsed: (collapased: boolean) => void
    setElementsOrder: (baseElements: BaseElement[]) => void
    setOriginalElements: (elements: IssueFormElement[]) => void
    toggleCollapseElement: (elementId: IssueFormElement['_id']) => void
  }
}

interface BaseElement {
  _id: IssueFormElement['_id']
  type: IssueFormElement['type']
}
