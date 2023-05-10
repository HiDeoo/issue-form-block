import { Box, Button, Heading, Text, TextInput } from '@primer/react'

import { useMetadata } from '../../hooks/useMetadata'

import { PreviewSeparator } from './PreviewSeparator'

export function MetadataPreview() {
  const metadata = useMetadata()

  return (
    <>
      <Box
        sx={{
          alignItems: 'center',
          bg: 'canvas.inset',
          border: 1,
          borderColor: 'border.default',
          borderRadius: 2,
          borderStyle: 'solid',
          display: 'flex',
          gap: 3,
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Box overflow="hidden">
          <Heading sx={{ fontSize: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {metadata.name}
          </Heading>
          <Text color="fg.muted" fontSize={1}>
            {metadata.description}
          </Text>
        </Box>
        <Button disabled variant="primary">
          Get started
        </Button>
      </Box>
      <PreviewSeparator />
      <TextInput placeholder="Title" readOnly sx={{ bg: 'canvas.inset' }} value={metadata.title ?? ''} />
      <PreviewSeparator />
    </>
  )
}
