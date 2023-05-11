import type { FileBlockProps } from '@githubnext/blocks'
import { BaseStyles, ThemeProvider } from '@primer/react'
import { type CSSProperties, useCallback, useState, useEffect, useMemo } from 'react'
import { debounce } from 'throttle-debounce'

import { ErrorBoundary } from './components/ErrorBoundary'
import { IssueForm } from './components/IssueForm'
import { issueFormElementsSelector } from './hooks/useIssueForm'
import { isValidIssueFormExtension, isValidIssueFormPath, serializeIssueForm } from './libs/issueForm'
import { useElementsStore } from './stores/elements'
import { useErrorsStore } from './stores/errors'
import { useMetadataStore } from './stores/metadata'

import './styles.css'

const baseStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
}

export default function App({ content, context, isEditable, onUpdateContent, originalContent }: FileBlockProps) {
  const [didEditContent, setDidEditContent] = useState(false)
  const [shouldParseContent, setShouldParseContent] = useState(true)

  const handleChange = useMemo(
    () =>
      debounce(250, () => {
        const { actions, ...metadata } = useMetadataStore.getState()
        const elements = issueFormElementsSelector(useElementsStore.getState())

        const { errors, yaml } = serializeIssueForm(metadata, elements)

        useErrorsStore.getState().actions.setErrors(errors)

        if (isEditable) {
          onUpdateContent(yaml)
        }
      }),
    [isEditable, onUpdateContent]
  )

  useEffect(() => {
    if (content !== originalContent) {
      setDidEditContent(true)
    }
  }, [content, originalContent])

  useEffect(() => {
    if (didEditContent && !shouldParseContent && content === originalContent) {
      setDidEditContent(false)
      setShouldParseContent(true)
    }
  }, [content, didEditContent, originalContent, shouldParseContent])

  useEffect(() => useMetadataStore.subscribe(handleChange), [handleChange])
  useEffect(() => useElementsStore.subscribe(handleChange), [handleChange])

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
