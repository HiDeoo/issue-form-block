import { memo, useEffect } from 'react'

import { useElementsActions } from '../hooks/useElementsActions'
import { useMetadataActions } from '../hooks/useMetadataActions'
import { parseIssueForm } from '../libs/issueForm'

import { Header } from './Header'
import { Panels } from './Panels'

export const IssueForm = memo(function IssueForm({
  content,
  isEditable,
  isValidExtension,
  isValidPath,
  onParseContent,
  shouldParseContent,
}: IssueFormProps) {
  const { setOriginalMetadata } = useMetadataActions()
  const { setOriginalElements } = useElementsActions()

  useEffect(() => {
    if (!shouldParseContent) {
      return
    }

    onParseContent()

    const issueForm = parseIssueForm(content)

    setOriginalMetadata(issueForm.metadata)
    setOriginalElements(issueForm.elements)
  }, [content, onParseContent, setOriginalElements, setOriginalMetadata, shouldParseContent])

  return (
    <>
      <Header isEditable={isEditable} isValidExtension={isValidExtension} isValidPath={isValidPath} />
      <Panels />
    </>
  )
})

interface IssueFormProps {
  content: string
  isEditable: boolean
  isValidExtension: boolean
  isValidPath: boolean
  onParseContent: () => void
  shouldParseContent: boolean
}
