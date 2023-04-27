import { Box } from '@primer/react'

export function Block({ children }: BlockProps) {
  return (
    <Box
      sx={{
        bg: 'canvas.subtle',
        border: 1,
        borderColor: 'border.default',
        borderRadius: 2,
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
      }}
    >
      {children}
    </Box>
  )
}

interface BlockProps {
  children: React.ReactNode
}
