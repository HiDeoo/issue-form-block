import { useCallback } from 'react'

import { useElementsActions } from './useElementsActions'
import { useMetadataActions } from './useMetadataActions'

export function useResetActions() {
  const { resetMetadata } = useMetadataActions()
  const { resetElements } = useElementsActions()

  const resetIssueForm = useCallback(() => {
    resetMetadata()
    resetElements()
  }, [resetElements, resetMetadata])

  return { resetIssueForm }
}
