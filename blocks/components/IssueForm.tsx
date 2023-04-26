import { useMemo } from 'react'

import { parseIssueForm } from '../libs/issueForm'

export function IssueForm({ content }: IssueFormProps) {
  const issueForm = useMemo(() => parseIssueForm(content), [content])

  // FIXME(HiDeoo)
  console.error('🚨 [IssueForm.tsx:6] issueForm:', issueForm)

  return <div>IssueForm</div>
}

interface IssueFormProps {
  content: string
}
