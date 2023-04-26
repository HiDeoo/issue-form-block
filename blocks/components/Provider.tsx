import { Provider as StateProvider, type PrimitiveAtom, atom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { useMemo } from 'react'

import { issueFormBodyAtom, issueFormDetailsAtom } from '../atoms'
import { parseIssueForm, type IssueFormDetails, type IssueFormElement } from '../libs/issueForm'

export function Provider({ children, content }: ProviderProps) {
  const { body, details } = useMemo(() => {
    const issueForm = parseIssueForm(content)

    // FIXME(HiDeoo)
    console.error('🚨 [Provider.tsx:13] issueForm:', issueForm)

    return {
      body: issueForm.body.map((element) => {
        return atom(element)
      }),
      details: issueForm.details,
    }
  }, [content])

  return (
    <StateProvider>
      <Hydrate body={body} details={details}>
        {children}
      </Hydrate>
    </StateProvider>
  )
}

function Hydrate({ body, children, details }: HydrateProps) {
  useHydrateAtoms([
    [issueFormBodyAtom, body],
    [issueFormDetailsAtom, details],
  ])

  return <>{children}</>
}

interface ProviderProps {
  content: string
  children: React.ReactNode
}

interface HydrateProps {
  body: PrimitiveAtom<IssueFormElement>[]
  children: React.ReactNode
  details: IssueFormDetails
}
