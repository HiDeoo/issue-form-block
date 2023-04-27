import { useAtomValue } from 'jotai'

import { issueFormMetadataAtom } from '../../atoms/issueForm'

export function MetadataPreview() {
  const metadata = useAtomValue(issueFormMetadataAtom)

  return (
    <div>
      <div>{metadata.name}</div>
      <div>{metadata.description}</div>
    </div>
  )
}
