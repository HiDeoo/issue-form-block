import { AlertIcon } from '@primer/octicons-react'
import { Box, Flash, Link, StyledOcticon, Text } from '@primer/react'
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary'

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>
}

function ErrorFallback({ error }: FallbackProps) {
  const message = error.cause instanceof Error && error.cause.stack ? error.cause.stack : error.stack ?? error.message

  return (
    <Box p={2}>
      <Flash
        variant="danger"
        sx={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          color: 'danger.fg',
        }}
      >
        <StyledOcticon icon={AlertIcon} />
        Something went wrong!
        <Text as="p" sx={{ fontSize: 1 }}>
          You can report this error by opening a new issue in the{' '}
          <Link href="https://github.com/HiDeoo/issue-form-block/issues/new/choose" target="_blank">
            HiDeoo/issue-form-block
          </Link>{' '}
          repository with the error below.
        </Text>
      </Flash>
      <Text
        as="pre"
        sx={{
          borderRadius: 2,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderWidth: 1,
          borderTopWidth: 0,
          borderStyle: 'solid',
          borderColor: 'border.default',
          fontFamily: 'mono',
          fontSize: 1,
          marginTop: 0,
          overflowX: 'auto',
          p: 3,
        }}
      >
        {message}
      </Text>
    </Box>
  )
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}
