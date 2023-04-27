import { useAtomValue, type PrimitiveAtom } from 'jotai'

import { issueFormBodyAtom, issueFormDetailsAtom } from '../../atoms'
import type { IssueFormElement } from '../../libs/issueForm'
import { Panel } from '../Panel'

export function Preview() {
  const details = useAtomValue(issueFormDetailsAtom)
  const body = useAtomValue(issueFormBodyAtom)

  // TODO(HiDeoo)
  if (!details || !body) {
    // TODO(HiDeoo)
    throw new Error('No issue form details found to render a preview.')
  }

  return (
    <Panel>
      <div>{details.name}</div>
      <ul>
        {body.map((elementAtom, index) => (
          <Elem atom={elementAtom} key={index} />
        ))}
      </ul>
    </Panel>
  )
}

// FIXME(HiDeoo)
export function Elem({ atom }: ElemeProps) {
  const element = useAtomValue(atom)

  // FIXME(HiDeoo)
  console.error('🚨 [Preview.tsx:32] PREVIEW:', element.type)

  return <div>{element.type}</div>
}

interface ElemeProps {
  atom: PrimitiveAtom<IssueFormElement>
}
