import { useAtomValue } from 'jotai'

import { isTextareaAtom, type ElementAtom, isInputAtom, isMarkdownAtom } from '../../atoms/issueForm'
import { TextareaPreview } from '../preview/TextareaPreview'

import { InputPreview } from './InputPreview'
import { MarkdownPreview } from './MarkdownPreview'

export function ElementPreview({ atom }: ElementEditorProps) {
  const element = useAtomValue(atom)

  if (isInputAtom(atom, element)) {
    return <InputPreview atom={atom} />
  } else if (isMarkdownAtom(atom, element)) {
    return <MarkdownPreview atom={atom} />
  } else if (isTextareaAtom(atom, element)) {
    return <TextareaPreview atom={atom} />
  }

  // TODO(HiDeoo)
  return <div>UNSUPPORTED ELEMENT</div>
}

interface ElementEditorProps {
  atom: ElementAtom
}
