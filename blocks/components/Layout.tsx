import { Box } from '@primer/react'
import { useAtomValue } from 'jotai'

import { selectedPanelAtom } from '../atoms'
import { useLayout } from '../hooks/useLayout'

import { Editor } from './editor/Editor'
import { Preview } from './preview/Preview'

export function Layout() {
  const { isSingleColumn } = useLayout()
  const selectedPanel = useAtomValue(selectedPanelAtom)

  return (
    <Box display="grid" gridTemplateColumns={['1fr', '1fr', '1fr 1px 1fr']} height="100%" overflow="hidden">
      {isSingleColumn && selectedPanel === 'preview' ? null : <Editor />}
      {isSingleColumn ? null : <Box bg="border.default" />}
      {isSingleColumn && selectedPanel === 'editor' ? null : <Preview />}
    </Box>
  )
}
