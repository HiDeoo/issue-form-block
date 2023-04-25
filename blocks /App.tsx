import type { FileBlockProps } from '@githubnext/blocks'
import { BaseStyles, Box, ThemeProvider } from '@primer/react'

export default function App({ content }: FileBlockProps) {
  // FIXME(HiDeoo)
  console.error('🚨 [App.tsx:5] content:', content)

  return (
    <ThemeProvider>
      <BaseStyles className="base">
        <Box sx={{ bg: 'canvas.subtle' }}>Hello</Box>
      </BaseStyles>
    </ThemeProvider>
  )
}
