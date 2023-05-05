import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { ZodError } from 'zod'

import { ErrorBox } from '../ErrorBox'

export function YamlErrorBoundary({ children }: YamlErrorBoundaryProps) {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>
}

function ErrorFallback({ error }: FallbackProps) {
  const isZodError = error instanceof ZodError

  if (!isZodError) {
    throw error
  }

  return <ErrorBox error={error} sx={{ p: 0 }} title="The issue form contains the following errors:" />
}

interface YamlErrorBoundaryProps {
  children: React.ReactNode
}
