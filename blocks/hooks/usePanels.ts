import { theme } from '@primer/react'
import { useSyncExternalStore } from 'react'

import { usePanelsStore, type PanelsState } from '../stores/panels'

const query = `(max-width: ${theme.breakpoints[1] ?? '768px'})`

export function usePanels() {
  const selectedPanel = usePanelsStore(selector)

  const matches = useSyncExternalStore(subscribe, getSnapshot)

  return { isSinglePanel: matches, selectedPanel }
}

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia(query)

  mediaQuery.addEventListener('change', onChange)

  return () => {
    mediaQuery.removeEventListener('change', onChange)
  }
}

function getSnapshot() {
  return window.matchMedia(query).matches
}

function selector(state: PanelsState) {
  return state.selectedPanel
}
