import { Avatar, Box, Button, Heading, Label, LabelGroup, Link, Text, TextInput } from '@primer/react'

import { useMetadata } from '../../hooks/useMetadata'

import { PreviewSeparator } from './PreviewSeparator'

const assigneeStyle = {
  color: 'fg.default',
  textDecoration: 'none',
  '&:hover': {
    color: 'accent.fg',
  },
  '&:focus-visible': {
    outlineColor: 'accent.fg',
  },
}

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
      {metadata.assignees.length > 0 ? (
        <>
          <PreviewSeparator />
          <Text fontSize={1} fontWeight={600}>
            Assignees
          </Text>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {metadata.assignees.map((assignee) => (
              <Box display="flex" key={assignee._id}>
                <Link
                  href="https://github.com/HiDeoo/issue-form-block/issues/new/choose"
                  sx={assigneeStyle}
                  target="_blank"
                >
                  <Avatar src={`https://avatars.githubusercontent.com/${assignee.text}`} sx={{ mr: 1 }} />
                  <Text fontSize={1} fontWeight={600}>
                    {assignee.text}
                  </Text>
                </Link>
              </Box>
            ))}
          </Box>
        </>
      ) : null}
      {metadata.labels.length > 0 ? (
        <>
          <PreviewSeparator />
          <Text fontSize={1} fontWeight={600}>
            Labels
          </Text>
          <LabelGroup>
            {metadata.labels.map((label) => (
              <Label key={label._id} variant="done" sx={{ bg: 'done.subtle' }}>
                {label.text}
              </Label>
            ))}
          </LabelGroup>
        </>
      ) : null}
      <PreviewSeparator />
    </>
  )
}
