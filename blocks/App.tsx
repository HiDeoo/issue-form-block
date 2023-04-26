import type { FileBlockProps } from '@githubnext/blocks'
import { BaseStyles, ThemeProvider } from '@primer/react'

import { Editor } from './components/editor/Editor'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Preview } from './components/preview/Preview'
import { Provider } from './components/Provider'

export default function App({ content }: FileBlockProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BaseStyles className="base">
          <Provider content={content}>
            <Editor />
            <Preview />
          </Provider>
        </BaseStyles>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
