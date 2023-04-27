import { useAtomValue } from 'jotai'

import type { TextareaElementAtom } from '../../atoms/issueForm'

export function TextareaPreview({ atom }: TextareaPreviewProps) {
  const textarea = useAtomValue(atom)

  return <div>{textarea.attributes.label}</div>
}

interface TextareaPreviewProps {
  atom: TextareaElementAtom
}
