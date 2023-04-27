import { theme } from '@primer/react'
import { useSyncExternalStore } from 'react'

const query = `(max-width: ${theme.breakpoints[1] ?? '768px'})`

export function usePanels() {
  const matches = useSyncExternalStore(subscribe, getSnapshot)

  return { isSinglePanel: matches }
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
