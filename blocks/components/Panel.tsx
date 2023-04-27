import { Box } from '@primer/react'

export function Panel({ children }: PanelProps) {
  return <Box overflow="auto">{children}</Box>
}

interface PanelProps {
  children: React.ReactNode
}
