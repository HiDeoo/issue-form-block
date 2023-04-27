import { useAtomValue } from 'jotai'

import { issueFormElementsAtom } from '../atoms'

export function useIssueFormElements() {
  const elements = useAtomValue(issueFormElementsAtom)

  if (!elements) {
    throw new Error('Missing issue form elements.')
  }

  return elements
}
