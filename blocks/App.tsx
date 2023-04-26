import type { FileBlockProps } from '@githubnext/blocks'
import { BaseStyles, ThemeProvider } from '@primer/react'

import { ErrorBoundary } from './components/ErrorBoundary'
import { IssueForm } from './components/IssueForm'

export default function App({ content }: FileBlockProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BaseStyles className="base">
          <IssueForm content={content} />
        </BaseStyles>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
