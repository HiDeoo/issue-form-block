import { useAtomValue } from 'jotai'

import { isTextareaAtom, type ElementAtom, isInputAtom } from '../../atoms/issueForm'
import { TextareaPreview } from '../preview/TextareaPreview'

import { InputPreview } from './InputPreview'

export function ElementPreview({ atom }: ElementEditorProps) {
  const element = useAtomValue(atom)

  if (isTextareaAtom(atom, element)) {
    return <TextareaPreview atom={atom} />
  } else if (isInputAtom(atom, element)) {
    return <InputPreview atom={atom} />
  }

  // TODO(HiDeoo)
  return <div>UNSUPPORTED ELEMENT</div>
}

interface ElementEditorProps {
  atom: ElementAtom
}
