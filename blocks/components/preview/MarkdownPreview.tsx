import { Box } from '@primer/react'
import { MarkdownViewer } from '@primer/react/drafts'
import { useAtomValue } from 'jotai'

import type { MarkdownElementAtom } from '../../atoms/issueForm'
import { getMarkdownHtml } from '../../libs/markdown'

const markdownStyle = {
  '>div>div': {
    a: { color: 'accent.fg' },
    p: { fontSize: 1, m: 0 },
  },
}

export function MarkdownPreview({ atom }: MarkdownPreviewProps) {
  const markdown = useAtomValue(atom)

  return (
    <Box sx={markdownStyle}>
      <MarkdownViewer dangerousRenderedHTML={{ __html: getMarkdownHtml(markdown.attributes.value) }} />
    </Box>
  )
}

interface MarkdownPreviewProps {
  atom: MarkdownElementAtom
}
