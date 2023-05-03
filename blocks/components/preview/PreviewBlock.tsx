import { Box, Text } from '@primer/react'

import { Markdown } from './Markdown'

const descriptionStyle = {
  color: 'fg.muted',
  mb: 2,
  '>div>div': {
    p: { fontSize: 0 },
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
      {showDescription ? <Markdown sx={descriptionStyle}>{description}</Markdown> : null}
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
