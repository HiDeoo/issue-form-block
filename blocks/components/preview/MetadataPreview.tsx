import { Box, Button, Heading, Text, TextInput } from '@primer/react'
import { useAtomValue } from 'jotai'

import { issueFormMetadataAtom } from '../../atoms/issueForm'

import { PreviewSeparator } from './PreviewSeparator'

export function MetadataPreview() {
  const metadata = useAtomValue(issueFormMetadataAtom)

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
      <TextInput placeholder="Title" sx={{ bg: 'canvas.inset' }} value={metadata.title ?? ''} />
      <PreviewSeparator />
    </>
  )
}
