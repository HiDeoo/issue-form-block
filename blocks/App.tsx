import type { FileBlockProps } from '@githubnext/blocks'
import { BaseStyles, ThemeProvider } from '@primer/react'
import { type CSSProperties, useCallback, useState } from 'react'

import { ErrorBoundary } from './components/ErrorBoundary'
import { Header } from './components/Header'
import { Panels } from './components/Panels'
import { Provider } from './components/Provider'
import { isValidIssueFormExtension, isValidIssueFormPath } from './libs/issueForm'

import './styles.css'

const baseStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
}

export default function App({ context, isEditable, onUpdateContent, originalContent }: FileBlockProps) {
  const [shouldParseContent, setShouldParseContent] = useState(true)

  const isValidExtension = isValidIssueFormExtension(context.file)
  const isValidPath = isValidIssueFormPath(context.path, context.file)

  const handleContentParse = useCallback(() => {
    setShouldParseContent(false)
  }, [])

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BaseStyles style={baseStyles}>
          <Provider
            content={originalContent}
            isEditable={isEditable}
            onParseContent={handleContentParse}
            shouldParseContent={shouldParseContent}
            updateContent={onUpdateContent}
          >
            <Header isEditable={isEditable} isValidExtension={isValidExtension} isValidPath={isValidPath} />
            <Panels />
          </Provider>
        </BaseStyles>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
