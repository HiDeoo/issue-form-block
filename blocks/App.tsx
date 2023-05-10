import type { FileBlockProps } from '@githubnext/blocks'
import { BaseStyles, ThemeProvider } from '@primer/react'
import type { CSSProperties } from 'react'

import { ErrorBoundary } from './components/ErrorBoundary'
import { Header } from './components/Header'
import { Panels } from './components/Panels'
import { Provider } from './components/Provider'

import './styles.css'

const baseStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
}

export default function App({ originalContent }: FileBlockProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BaseStyles style={baseStyles}>
          <Provider content={originalContent}>
            <Header />
            <Panels />
          </Provider>
        </BaseStyles>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
