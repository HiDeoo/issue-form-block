import { useAtomValue } from 'jotai'

import { issueFormMetadataAtom } from '../atoms'

export function useIssueFormMetadata() {
  const metadata = useAtomValue(issueFormMetadataAtom)

  if (!metadata) {
    throw new Error('Missing issue form metadata.')
  }

  return metadata
}
