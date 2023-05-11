import type { FileBlockProps } from '@githubnext/blocks'
import { useMemo } from 'react'

import { Report } from './Report'

export function Warnings({ isEditable, isValidExtension, isValidPath }: WarningsProps) {
  const warnings = useMemo(() => {
    return [
      !isEditable && 'You do not have the permissions to save changes to this issue form.',
      !isValidPath && (
        <>
          Issue forms must be located in the <code>.github/ISSUE_TEMPLATE</code> directory to be used.
        </>
      ),
      !isValidExtension && (
        <>
          Issue forms must have the <code>.yml</code> or <code>.yaml</code> extension to be used.
        </>
      ),
    ].filter(Boolean)
  }, [isEditable, isValidExtension, isValidPath])

  return <Report messages={warnings} variant="warning" />
}

interface WarningsProps {
  isEditable: FileBlockProps['isEditable']
  isValidExtension: boolean
  isValidPath: boolean
}
