import { useAtomValue, type PrimitiveAtom, useAtom } from 'jotai'

import { issueFormBodyAtom, issueFormDetailsAtom } from '../../atoms'
import type { IssueFormElement } from '../../libs/issueForm'
import { Panel } from '../Panel'

export function Editor() {
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
  const [element, setElement] = useAtom(atom)

  // FIXME(HiDeoo)
  console.error('🚨 [Preview.tsx:32] EDITOR:', element.type)

  return (
    <input
      value={element.type}
      onChange={(event) => {
        setElement({
          ...element,
          // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
          // @ts-ignore -- // FIXME(HiDeoo)
          type: event.target.value,
        })
      }}
    />
  )
}

interface ElemeProps {
  atom: PrimitiveAtom<IssueFormElement>
}
