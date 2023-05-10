import type { FileBlockProps } from '@githubnext/blocks'
import { BaseStyles, ThemeProvider } from '@primer/react'
import type { CSSProperties } from 'react'

import { ErrorBoundary } from './components/ErrorBoundary'
import { Header } from './components/Header'
import { Panels } from './components/Panels'
import { Provider } from './components/Provider'
import { isValidIssueFormPath } from './libs/issueForm'

import './styles.css'

const baseStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
}

export default function App({ context, isEditable, onUpdateContent, originalContent }: FileBlockProps) {
  const isValidPath = isValidIssueFormPath(context.path, context.file)

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BaseStyles style={baseStyles}>
          <Provider content={originalContent} isEditable={isEditable} updateContent={onUpdateContent}>
            <Header isEditable={isEditable} isValidPath={isValidPath} />
            <Panels />
          </Provider>
        </BaseStyles>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
