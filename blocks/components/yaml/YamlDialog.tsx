import { FileCodeIcon } from '@primer/octicons-react'
import { Box, Dialog, IconButton, Portal, Tooltip } from '@primer/react'
import { useRef, useState } from 'react'

import { YamlPreview } from './YamlPreview'

const triggerButtonTooltip = 'Preview yaml'

export function YamlDialog() {
  const trigger = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  function toggleOpened() {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  return (
    <>
      <Tooltip aria-label={triggerButtonTooltip} direction="w">
        <IconButton aria-label={triggerButtonTooltip} icon={FileCodeIcon} onClick={toggleOpened} ref={trigger} />
      </Tooltip>
      <Portal>
        <Dialog
          aria-labelledby="yaml-dialog-header"
          isOpen={isOpen}
          onDismiss={toggleOpened}
          returnFocusRef={trigger}
          sx={{ display: 'flex', flexDirection: 'column', width: '75vw' }}
        >
          <Dialog.Header id="yaml-dialog-header">Yaml</Dialog.Header>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              minHeight: 0,
              p: 3,
            }}
          >
            <YamlPreview />
          </Box>
        </Dialog>
      </Portal>
    </>
  )
}
