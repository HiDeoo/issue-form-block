import { useAtomValue } from 'jotai'

import type { MarkdownElementAtom } from '../../atoms/issueForm'

import { Markdown } from './Markdown'

export function MarkdownPreview({ atom }: MarkdownPreviewProps) {
  const markdown = useAtomValue(atom)

  return <Markdown>{markdown.attributes.value}</Markdown>
}

interface MarkdownPreviewProps {
  atom: MarkdownElementAtom
}
