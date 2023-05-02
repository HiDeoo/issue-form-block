import { useAtomValue } from 'jotai'

import { isTextareaAtom, type ElementAtom, isInputAtom, isMarkdownAtom, isDropdownAtom } from '../../atoms/issueForm'

import { DropdownPreview } from './DropdownPreview'
import { InputPreview } from './InputPreview'
import { MarkdownPreview } from './MarkdownPreview'
import { TextareaPreview } from './TextareaPreview'

export function ElementPreview({ atom }: ElementEditorProps) {
  const element = useAtomValue(atom)

  if (isDropdownAtom(atom, element)) {
    return <DropdownPreview atom={atom} />
  } else if (isInputAtom(atom, element)) {
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
