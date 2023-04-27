import { useAtomValue, type PrimitiveAtom } from 'jotai'

import type { TextareaElement } from '../../libs/issueForm'

export function TextareaPreview({ atom }: TextareaPreviewProps) {
  const textarea = useAtomValue(atom)

  return <div>{textarea.attributes.label}</div>
}

interface TextareaPreviewProps {
  atom: PrimitiveAtom<TextareaElement>
}
