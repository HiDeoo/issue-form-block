import { Box, Text } from '@primer/react'
import { MarkdownViewer } from '@primer/react/drafts'

import { getMarkdownHtml } from '../../libs/markdown'

const descriptionStyle = {
  color: 'fg.muted',
  mb: 2,
  '>div>div': {
    a: { color: 'accent.fg' },
    p: { fontSize: 0, m: 0 },
  },
}

const requiredMarkStyle = {
  ':after': {
    color: 'danger.fg',
    content: '"*"',
    pl: 1,
  },
}

export function PreviewBlock({ children, description, id, required, title }: PreviewBlockProps) {
  const showDescription = description && description.trim().length > 0

  return (
    <Box fontSize={1}>
      <Text
        as="label"
        htmlFor={id}
        sx={{ display: 'block', fontWeight: 600, mb: showDescription ? 0 : 2, ...(required ? requiredMarkStyle : {}) }}
      >
        {title}
      </Text>
      {showDescription ? (
        <Box id={`${id}-caption`} sx={descriptionStyle}>
          <MarkdownViewer dangerousRenderedHTML={{ __html: getMarkdownHtml(description) }} />
        </Box>
      ) : null}
      {children}
    </Box>
  )
}

interface PreviewBlockProps {
  children: React.ReactNode
  description?: string
  id: string
  required?: boolean
  title: string
}
