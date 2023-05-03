import { Box, merge } from '@primer/react'
import { MarkdownViewer } from '@primer/react/drafts'
import type { BetterSystemStyleObject } from '@primer/react/lib/sx'

import { getMarkdownHtml } from '../../libs/markdown'

const markdownStyle = {
  fontWeight: 400,
  '>div>div': {
    a: { color: 'accent.fg' },
    li: { strong: { fontWeight: 400 } },
    p: { fontSize: 1, mt: 0 },
  },
}

export function Markdown({ children, id, sx }: MarkdownProps) {
  return (
    <Box id={id} sx={sx ? merge<BetterSystemStyleObject>(markdownStyle, sx) : markdownStyle}>
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
  id?: string
  sx?: BetterSystemStyleObject
}
