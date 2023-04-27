import type { FileBlockProps } from '@githubnext/blocks'
import { BaseStyles, ThemeProvider } from '@primer/react'

import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './components/Layout'
import { Provider } from './components/Provider'

export default function App({ content }: FileBlockProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BaseStyles style={{ height: '100%' }}>
          <Provider content={content}>
            <Layout />
          </Provider>
        </BaseStyles>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
