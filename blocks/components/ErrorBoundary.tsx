import { Link } from '@primer/react'
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { ZodError } from 'zod'

import { ErrorBox } from './ErrorBox'

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>
}

function ErrorFallback({ error }: FallbackProps) {
  const isZodError = error instanceof ZodError

  const title = isZodError ? 'The file contains valid YAML but is not a valid issue form.' : 'Something went wrong!'
  const subtitle = isZodError ? (
    <>
      You can find more information about the issue form format in the{' '}
      <Link
        href="https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-githubs-form-schema"
        target="_blank"
      >
        documentation
      </Link>{' '}
      with the list of errors below.
    </>
  ) : (
    <>
      You can report this error by opening a new issue in the{' '}
      <Link href="https://github.com/HiDeoo/issue-form-block/issues/new/choose" target="_blank">
        HiDeoo/issue-form-block
      </Link>{' '}
      repository with the error below.
    </>
  )

  return <ErrorBox error={error} subtitle={subtitle} title={title} />
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}
