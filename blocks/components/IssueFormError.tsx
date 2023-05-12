import { Box } from '@primer/react'
import type { BetterSystemStyleObject } from '@primer/react/lib/sx'

import type { IssueFormError as IssueFormErrorType } from '../libs/issueForm'

const elementIndexRegex = /^body\.(\d+)/

export function IssueFormError({ error, sx }: IssueFormErrorProps) {
  const elementIndex = elementIndexRegex.exec(error.path)?.[1]

  const path = error.path.startsWith('body')
    ? elementIndex
      ? `Element at index ${elementIndex}`
      : 'Elements'
    : error.path

  return (
    <Box sx={sx}>
      <Box fontWeight={600} mb={2}>
        {path}
      </Box>
      <Box>{error.message}</Box>
    </Box>
  )
}

interface IssueFormErrorProps {
  error: IssueFormErrorType
  sx?: BetterSystemStyleObject
}
