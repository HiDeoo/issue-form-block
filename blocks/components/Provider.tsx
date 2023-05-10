import { useMemo } from 'react'

import { useElementsActions } from '../hooks/useElementsActions'
import { useMetadataActions } from '../hooks/useMetadataActions'
import { parseIssueForm } from '../libs/issueForm'

export function Provider({ children, content }: ProviderProps) {
  const { setOriginalMetadata } = useMetadataActions()
  const { setOriginalElements } = useElementsActions()

  useMemo(() => {
    const issueForm = parseIssueForm(content)

    // FIXME(HiDeoo)
    console.error('🚨 [Provider.tsx:13] issueForm:', issueForm)

    setOriginalMetadata(issueForm.metadata)
    setOriginalElements(issueForm.elements)
  }, [content, setOriginalElements, setOriginalMetadata])

  return <>{children}</>
}

interface ProviderProps {
  content: string
  children: React.ReactNode
}
