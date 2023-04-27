import { useAtomValue } from 'jotai'

import { isTextareaAtom, type ElementAtom } from '../../atoms/issueForm'

import { TextareaEditor } from './TextareaEditor'

export function ElementEditor({ atom }: ElementEditorProps) {
  const element = useAtomValue(atom)

  if (isTextareaAtom(atom, element)) {
    return <TextareaEditor atom={atom} />
  }

  // TODO(HiDeoo)
  return <div>UNSUPPORTED ELEMENT</div>
}

interface ElementEditorProps {
  atom: ElementAtom
}
