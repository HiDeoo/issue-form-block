import { AlertIcon } from '@primer/octicons-react'
import { Box, Flash, merge, StyledOcticon, Text } from '@primer/react'
import type { BetterSystemStyleObject } from '@primer/react/lib/sx'
import { ZodError } from 'zod'

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: 1,
  height: '100%',
  overflow: 'auto',
  p: 2,
}

export function ErrorBox({ error, subtitle, sx, title }: ErrorBoxProps) {
  const isZodError = error instanceof ZodError
  const message = error.cause instanceof Error && error.cause.stack ? error.cause.stack : error.stack ?? error.message

  return (
    <Box sx={sx ? merge<BetterSystemStyleObject>(boxStyle, sx) : boxStyle}>
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
        {subtitle ? (
          <Text as="p" sx={{ fontSize: 1 }}>
            {subtitle}
          </Text>
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
            <Box
              key={issueIndex}
              sx={{
                bg: 'canvas.subtle',
                borderRadius: 2,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'border.default',
                display: 'grid',
                columnGap: 3,
                gridTemplateColumns: 'auto 1fr',
                p: 3,
              }}
            >
              <Box>Path:</Box>
              <Text fontFamily="mono">{issue.path.join('.')}</Text>
              <Box>Code:</Box>
              <Text fontFamily="mono">{issue.code}</Text>
              <Box>Message:</Box>
              <Text fontFamily="mono">{issue.message}</Text>
            </Box>
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

interface ErrorBoxProps {
  error: Error
  subtitle?: React.ReactNode
  sx?: BetterSystemStyleObject
  title: string
}
