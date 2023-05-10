import { useElement } from '../../hooks/useElement'
import type { MarkdownElement } from '../../libs/issueForm'

import { Markdown } from './Markdown'

export function MarkdownPreview({ _id }: MarkdownPreviewProps) {
  const markdown = useElement(_id, 'markdown')

  return <Markdown>{markdown.attributes.value}</Markdown>
}

interface MarkdownPreviewProps {
  _id: MarkdownElement['_id']
}
