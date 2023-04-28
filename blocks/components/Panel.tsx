import { Box } from '@primer/react'

export function Panel({ children }: PanelProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        overflowX: 'hidden',
        overflowY: 'auto',
        p: 2,
      }}
    >
      {children}
    </Box>
  )
}

interface PanelProps {
  children: React.ReactNode
}
