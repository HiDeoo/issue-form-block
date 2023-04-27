import { useAtomValue, type PrimitiveAtom } from 'jotai'

import { isTextareaAtom } from '../../atoms'
import type { IssueFormElement } from '../../libs/issueForm'
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
  atom: PrimitiveAtom<IssueFormElement>
}
