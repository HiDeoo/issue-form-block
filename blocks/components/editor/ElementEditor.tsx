import { useAtomValue } from 'jotai'

import { isTextareaAtom, type ElementAtom, isInputAtom, isMarkdownAtom } from '../../atoms/issueForm'

import type { DraggableProps } from './ElementDraggableEditor'
import { InputEditor } from './InputEditor'
import { MarkdownEditor } from './MarkdownEditor'
import { TextareaEditor } from './TextareaEditor'

export function ElementEditor({ atom, ...others }: ElementEditorProps) {
  const element = useAtomValue(atom)

  if (isInputAtom(atom, element)) {
    return <InputEditor atom={atom} {...others} />
  } else if (isMarkdownAtom(atom, element)) {
    return <MarkdownEditor atom={atom} {...others} />
  } else if (isTextareaAtom(atom, element)) {
    return <TextareaEditor atom={atom} {...others} />
  }

  // TODO(HiDeoo)
  return <div>UNSUPPORTED ELEMENT</div>
}

interface ElementEditorProps extends DraggableProps {
  atom: ElementAtom
}
