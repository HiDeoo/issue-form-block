import { Box, merge } from '@primer/react'
import { MarkdownViewer } from '@primer/react/drafts'
import type { BetterSystemStyleObject } from '@primer/react/lib/sx'

import { getMarkdownHtml } from '../../libs/markdown'

const markdownStyle = {
  fontWeight: '400',
  '>div>div': {
    a: { color: 'accent.fg' },
    p: { fontSize: 1, m: 0 },
  },
}

export function Markdown({ children, sx }: MarkdownProps) {
  return (
    <Box sx={sx ? merge<BetterSystemStyleObject>(markdownStyle, sx) : markdownStyle}>
      <MarkdownViewer
        dangerousRenderedHTML={{
          __html: getMarkdownHtml(children),
        }}
      />
    </Box>
  )
}

interface MarkdownProps {
  children: string
  sx?: BetterSystemStyleObject
}
