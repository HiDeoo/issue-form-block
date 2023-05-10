import type { FileBlockProps } from '@githubnext/blocks'
import { BaseStyles, ThemeProvider } from '@primer/react'
import { type CSSProperties, useCallback, useState, useEffect } from 'react'
import { debounce } from 'throttle-debounce'

import { ErrorBoundary } from './components/ErrorBoundary'
import { IssueForm } from './components/IssueForm'
import { issueFormElementsSelector } from './hooks/useIssueForm'
import { isValidIssueFormExtension, isValidIssueFormPath, serializeIssueForm } from './libs/issueForm'
import { useElementsStore } from './stores/elements'
import { useMetadataStore } from './stores/metadata'

import './styles.css'

const baseStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
}

export default function App({ context, isEditable, onUpdateContent, originalContent }: FileBlockProps) {
  const [shouldParseContent, setShouldParseContent] = useState(true)

  useEffect(
    () => useMetadataStore.subscribe(() => (isEditable ? reportChanges(onUpdateContent) : undefined)),
    [isEditable, onUpdateContent]
  )

  useEffect(
    () => useElementsStore.subscribe(() => (isEditable ? reportChanges(onUpdateContent) : undefined)),
    [isEditable, onUpdateContent]
  )

  const handleContentParse = useCallback(() => {
    setShouldParseContent(false)
  }, [])

  const isValidExtension = isValidIssueFormExtension(context.file)
  const isValidPath = isValidIssueFormPath(context.path, context.file)

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BaseStyles style={baseStyles}>
          <IssueForm
            content={originalContent}
            isEditable={isEditable}
            isValidExtension={isValidExtension}
            isValidPath={isValidPath}
            onParseContent={handleContentParse}
            shouldParseContent={shouldParseContent}
          />
        </BaseStyles>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

const reportChanges = debounce(250, (reporter: FileBlockProps['onUpdateContent']) => {
  const { actions, original, ...metadata } = useMetadataStore.getState()
  const elements = issueFormElementsSelector(useElementsStore.getState())

  const { yaml } = serializeIssueForm(metadata, elements)

  reporter(yaml)
})
