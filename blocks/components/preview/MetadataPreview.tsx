import { useAtomValue } from 'jotai'

import { issueFormMetadataAtom } from '../../atoms'

export function MetadataPreview() {
  const metadata = useAtomValue(issueFormMetadataAtom)

  if (!metadata) {
    throw new Error('Missing issue form metadata.')
  }

  return (
    <div>
      <div>{metadata.name}</div>
      <div>{metadata.description}</div>
    </div>
  )
}
