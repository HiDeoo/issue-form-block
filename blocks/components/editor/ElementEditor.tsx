import { useAtomValue, type PrimitiveAtom } from 'jotai'

import { isTextareaAtom } from '../../atoms'
import type { IssueFormElement } from '../../libs/issueForm'

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
  atom: PrimitiveAtom<IssueFormElement>
}
