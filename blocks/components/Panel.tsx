import { Box } from '@primer/react'

export function Panel({ children }: PanelProps) {
  return (
    <Box overflow="auto" p={2}>
      {children}
    </Box>
  )
}

interface PanelProps {
  children: React.ReactNode
}
