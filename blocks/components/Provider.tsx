import type { FileBlockProps } from '@githubnext/blocks'
import { useEffect } from 'react'
import { debounce } from 'throttle-debounce'

import { useElementsActions } from '../hooks/useElementsActions'
import { issueFormElementsSelector } from '../hooks/useIssueForm'
import { useMetadataActions } from '../hooks/useMetadataActions'
import { parseIssueForm, serializeIssueForm } from '../libs/issueForm'
import { useElementsStore } from '../stores/elements'
import { useMetadataStore } from '../stores/metadata'

export function Provider({
  children,
  content,
  isEditable,
  onParseContent,
  shouldParseContent,
  updateContent,
}: ProviderProps) {
  const { setOriginalMetadata } = useMetadataActions()
  const { setOriginalElements } = useElementsActions()

  useEffect(() => {
    if (!shouldParseContent) {
      return
    }

    onParseContent()

    const issueForm = parseIssueForm(content)

    // FIXME(HiDeoo)
    console.error('🚨 [Provider.tsx:13] issueForm:', issueForm)

    setOriginalMetadata(issueForm.metadata)
    setOriginalElements(issueForm.elements)
  }, [content, onParseContent, setOriginalElements, setOriginalMetadata, shouldParseContent])

  useEffect(
    () => useMetadataStore.subscribe(() => (isEditable ? reportChanges(updateContent) : undefined)),
    [isEditable, updateContent]
  )

  useEffect(
    () => useElementsStore.subscribe(() => (isEditable ? reportChanges(updateContent) : undefined)),
    [isEditable, updateContent]
  )

  return <>{children}</>
}

const reportChanges = debounce(250, (updater: FileBlockProps['onUpdateContent']) => {
  const { actions, original, ...metadata } = useMetadataStore.getState()
  const elements = issueFormElementsSelector(useElementsStore.getState())

  const { yaml } = serializeIssueForm(metadata, elements)

  updater(yaml)
})

interface ProviderProps {
  content: string
  children: React.ReactNode
  isEditable: FileBlockProps['isEditable']
  onParseContent: () => void
  shouldParseContent: boolean
  updateContent: FileBlockProps['onUpdateContent']
}
