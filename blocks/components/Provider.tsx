import { useSetAtom } from 'jotai'
import { useMemo } from 'react'

import { setIssueFormAtom } from '../atoms/issueForm'
import { parseIssueForm } from '../libs/issueForm'

export function Provider({ children, content }: ProviderProps) {
  const setIssueForm = useSetAtom(setIssueFormAtom)

  useMemo(() => {
    const issueForm = parseIssueForm(content)

    // FIXME(HiDeoo)
    console.error('🚨 [Provider.tsx:13] issueForm:', issueForm)

    setIssueForm(issueForm)
  }, [content, setIssueForm])

  return <>{children}</>
}

interface ProviderProps {
  content: string
  children: React.ReactNode
}
