import { AlertIcon, CheckIcon, XCircleIcon } from '@primer/octicons-react'
import { Box, Button, Dialog, Flash, Portal, StyledOcticon, useTheme } from '@primer/react'
import { useRef, useState } from 'react'

const dialogHeaderStyle = {
  display: 'block',
  '&:first-letter': {
    textTransform: 'uppercase',
  },
}

const messagesStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  listStyleType: 'none',
  m: 0,
  overflowY: 'auto',
  p: 3,
}

const messageStyle = {
  bg: 'canvas.inset',
  borderColor: 'border.default',
  borderRadius: 2,
  borderStyle: 'solid',
  borderWidth: 1,
  fontSize: 1,
  p: 2,
  '& code': {
    fontFamily: 'mono',
  },
}

export function Report({ messages, variant }: ReportProps) {
  const { theme } = useTheme()

  const trigger = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  function toggleOpened() {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const showReport = messages.length > 0
  const isWarning = variant === 'warning'

  const bg = isWarning ? 'attention.subtle' : 'danger.subtle'
  const borderColor = isWarning ? 'attention.muted' : 'danger.muted'
  const triggerStyle = {
    bg,
    borderColor,
    '&:hover:not(:disabled)': {
      bg,
      borderColor,
    },
    '&:focus-visible:not(:disabled)': {
      boxShadow: '0px 0px 0px 3px inset white',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      outline: `${isWarning ? theme?.['colors'].attention.emphasis : theme?.['colors'].danger.emphasis} solid 2px`,
      outlineOffset: '-2px',
    },
    '& svg': {
      color: isWarning ? 'attention.emphasis' : 'danger.emphasis',
    },
  }
  const icon = isWarning ? AlertIcon : XCircleIcon

  return (
    <>
      {showReport ? (
        <Button leadingIcon={icon} onClick={toggleOpened} ref={trigger} sx={triggerStyle}>
          {messages.length} {variant}
          {messages.length === 1 ? '' : 's'}
        </Button>
      ) : null}
      <Portal>
        <Dialog
          aria-labelledby="report-dialog-header"
          isOpen={isOpen}
          onDismiss={toggleOpened}
          returnFocusRef={trigger}
          sx={{ display: 'flex', flexDirection: 'column', width: '75vw' }}
        >
          <Dialog.Header id="report-dialog-header" sx={dialogHeaderStyle}>
            {variant}s
          </Dialog.Header>
          {showReport ? (
            <Box as="ul" sx={messagesStyle}>
              {messages.map((message, index) => (
                <Box as="li" key={index} sx={messageStyle}>
                  {message}
                </Box>
              ))}
            </Box>
          ) : (
            <Flash variant="success" sx={{ fontSize: 1, m: 3, p: 2 }}>
              <StyledOcticon icon={CheckIcon} />
              The issue form does not have any {variant}s.
            </Flash>
          )}
        </Dialog>
      </Portal>
    </>
  )
}

interface ReportProps {
  messages: React.ReactNode[]
  variant: 'error' | 'warning'
}
