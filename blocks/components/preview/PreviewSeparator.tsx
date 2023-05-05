import { Box } from '@primer/react'

export function PreviewSeparator() {
  return (
    <Box
      sx={{
        border: 0,
        borderTop: 1,
        borderColor: 'border.default',
        borderStyle: 'dashed',
        mb: 1,
        mt: 1,
      }}
    />
  )
}
