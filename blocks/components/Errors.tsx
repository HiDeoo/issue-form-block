import { Box, Text } from '@primer/react'

import { useErrors } from '../hooks/useErrors'
import type { IssueFormError } from '../libs/issueForm'

import { Report } from './Report'

const errorMessageStyle = {
  columnGap: 3,
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
}

export function Errors() {
  const errors = useErrors()

  return (
    <Report
      messages={errors.map((error, index) => (
        <ErrorMessage error={error} key={index} />
      ))}
      variant="error"
    />
  )
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <Box sx={errorMessageStyle}>
      <Box>Path:</Box>
      <Text fontFamily="mono">{error.path}</Text>
      <Box>Message:</Box>
      <Text fontFamily="mono">{error.message}</Text>
    </Box>
  )
}

interface ErrorMessageProps {
  error: IssueFormError
}
