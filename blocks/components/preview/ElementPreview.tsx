import { useAtomValue } from 'jotai'

import { isTextareaAtom, type ElementAtom } from '../../atoms/issueForm'
import { TextareaPreview } from '../preview/TextareaPreview'

export function ElementPreview({ atom }: ElementEditorProps) {
  const element = useAtomValue(atom)

  if (isTextareaAtom(atom, element)) {
    return <TextareaPreview atom={atom} />
  }

  // TODO(HiDeoo)
  return <div>UNSUPPORTED ELEMENT</div>
}

interface ElementEditorProps {
  atom: ElementAtom
}
