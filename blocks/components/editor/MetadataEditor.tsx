import { useIssueFormMetadata } from '../../hooks/useIssueFormMetadata'

export function MetadataEditor() {
  const metadata = useIssueFormMetadata()

  return <div>{metadata.name}</div>
}
