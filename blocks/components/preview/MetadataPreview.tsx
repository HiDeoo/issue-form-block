import { useIssueFormMetadata } from '../../hooks/useIssueFormMetadata'

export function MetadataPreview() {
  const metadata = useIssueFormMetadata()

  return <div>{metadata.name}</div>
}
