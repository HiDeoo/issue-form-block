import { useAtomValue } from 'jotai'

import {
  isTextareaAtom,
  type ElementAtom,
  isInputAtom,
  isMarkdownAtom,
  isDropdownAtom,
  isCheckboxesAtom,
} from '../../atoms/issueForm'

import { CheckboxesPreview } from './CheckboxesPreview'
import { DropdownPreview } from './DropdownPreview'
import { InputPreview } from './InputPreview'
import { MarkdownPreview } from './MarkdownPreview'
import { TextareaPreview } from './TextareaPreview'

export function ElementPreview({ atom }: ElementEditorProps) {
  const element = useAtomValue(atom)

  if (isCheckboxesAtom(atom, element)) {
    return <CheckboxesPreview atom={atom} />
  } else if (isDropdownAtom(atom, element)) {
    return <DropdownPreview atom={atom} />
  } else if (isInputAtom(atom, element)) {
    return <InputPreview atom={atom} />
  } else if (isMarkdownAtom(atom, element)) {
    return <MarkdownPreview atom={atom} />
  } else if (isTextareaAtom(atom, element)) {
    return <TextareaPreview atom={atom} />
  }

  throw new Error(`Unsupported preview element '${element.type}'.`)
}

interface ElementEditorProps {
  atom: ElementAtom
}
