import { useAtomValue } from 'jotai'

import { isTextareaAtom, type ElementAtom } from '../../atoms/issueForm'

import type { DraggableProps } from './ElementDraggableEditor'
import { TextareaEditor } from './TextareaEditor'

export function ElementEditor({ atom, ...others }: ElementEditorProps) {
  const element = useAtomValue(atom)

  if (isTextareaAtom(atom, element)) {
    return <TextareaEditor atom={atom} {...others} />
  }

  // TODO(HiDeoo)
  return <div>UNSUPPORTED ELEMENT</div>
}

interface ElementEditorProps extends DraggableProps {
  atom: ElementAtom
}
