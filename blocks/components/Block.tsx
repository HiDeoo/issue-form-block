import { Box } from '@primer/react'

export function Block({ children, title }: BlockProps) {
  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          bg: 'canvas.subtle',
          border: 1,
          borderColor: 'border.default',
          borderStyle: 'solid',
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          display: 'flex',
          fontSize: 1,
          fontWeight: 600,
          gap: 2,
          p: 2,
        }}
      >
        {title}
      </Box>
      <Box
        sx={{
          border: 1,
          borderColor: 'border.default',
          borderRadius: 2,
          borderStyle: 'solid',
          borderTop: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflow: 'hidden',
          p: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

interface BlockProps {
  children: React.ReactNode
  title: string
}
