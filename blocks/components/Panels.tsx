import { Box } from '@primer/react'
import { useAtomValue } from 'jotai'

import { selectedPanelAtom } from '../atoms'
import { usePanels } from '../hooks/usePanels'

import { Editor } from './editor/Editor'
import { Preview } from './preview/Preview'

export function Panels() {
  const { isSinglePanel } = usePanels()
  const selectedPanel = useAtomValue(selectedPanelAtom)

  return (
    <Box display="grid" gridTemplateColumns={['1fr', '1fr', '1fr 1px 1fr']} height="100%" overflow="hidden">
      {isSinglePanel && selectedPanel === 'preview' ? null : <Editor />}
      {isSinglePanel ? null : <Box bg="border.default" />}
      {isSinglePanel && selectedPanel === 'editor' ? null : <Preview />}
    </Box>
  )
}
