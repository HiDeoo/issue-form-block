import { Provider as StateProvider, type PrimitiveAtom, atom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { useMemo } from 'react'

import { issueFormElementsAtom, issueFormMetadataAtom } from '../atoms'
import { parseIssueForm, type IssueFormElement, type IssueFormMetadata } from '../libs/issueForm'

export function Provider({ children, content }: ProviderProps) {
  const { elements, metadata } = useMemo(() => {
    const issueForm = parseIssueForm(content)

    // FIXME(HiDeoo)
    console.error('🚨 [Provider.tsx:13] issueForm:', issueForm)

    return {
      elements: issueForm.elements.map((element) => {
        return atom(element)
      }),
      metadata: issueForm.metadata,
    }
  }, [content])

  return (
    <StateProvider>
      <Hydrate elements={elements} metadata={metadata}>
        {children}
      </Hydrate>
    </StateProvider>
  )
}

function Hydrate({ children, elements, metadata }: HydrateProps) {
  useHydrateAtoms([
    [issueFormElementsAtom, elements],
    [issueFormMetadataAtom, metadata],
  ])

  return <>{children}</>
}

interface ProviderProps {
  content: string
  children: React.ReactNode
}

interface HydrateProps {
  children: React.ReactNode
  elements: PrimitiveAtom<IssueFormElement>[]
  metadata: IssueFormMetadata
}
