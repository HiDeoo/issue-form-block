import { AlertIcon } from '@primer/octicons-react'
import { Box, Button, Flash, Link, StyledOcticon, Text } from '@primer/react'
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary'

import { ZodError } from '../libs/validations'

import { IssueFormError } from './IssueFormError'

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
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
      with the list of errors below. You can also create a new issue form starting from scratch.
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
  const message = error.cause instanceof Error && error.cause.stack ? error.cause.stack : error.stack ?? error.message

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: 1,
        height: '100%',
        overflow: 'auto',
        p: 2,
      }}
    >
      <Flash
        variant="danger"
        sx={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          color: 'danger.fg',
        }}
      >
        <StyledOcticon icon={AlertIcon} />
        {title}
        <Text as="p" sx={{ fontSize: 1 }}>
          {subtitle}
        </Text>
        {isZodError ? (
          <Button onClick={resetErrorBoundary} variant="primary">
            New issue form
          </Button>
        ) : null}
      </Flash>
      <Box
        sx={{
          borderRadius: 2,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderWidth: 1,
          borderTopWidth: 0,
          borderStyle: 'solid',
          borderColor: 'border.default',
          display: 'flex',
          flexDirection: 'column',
          fontSize: 1,
          gap: 3,
          marginTop: 0,
          overflow: 'auto',
          p: 3,
        }}
      >
        {isZodError ? (
          error.issues.map((issue, issueIndex) => (
            <IssueFormError
              error={{ message: issue.message, path: issue.path.join('.') }}
              key={issueIndex}
              sx={{
                bg: 'canvas.subtle',
                borderRadius: 2,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'border.default',
                p: 3,
              }}
            />
          ))
        ) : (
          <Text as="pre" sx={{ fontFamily: 'mono', m: 0 }}>
            {message}
          </Text>
        )}
      </Box>
    </Box>
  )
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}
