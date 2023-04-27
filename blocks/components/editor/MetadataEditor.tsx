import { useAtom } from 'jotai'

import { issueFormMetadataAtom } from '../../atoms'
import { Block } from '../Block'
import { TextInput } from '../TextInput'

export function MetadataEditor() {
  const [metadata, setMetadata] = useAtom(issueFormMetadataAtom)

  if (!metadata) {
    throw new Error('Missing issue form metadata.')
  }

  function handleNameChange(name: string) {
    setMetadata((prevMetadata) => (prevMetadata ? { ...prevMetadata, name } : prevMetadata))
  }

  function handleDescriptionChange(description: string) {
    setMetadata((prevMetadata) => (prevMetadata ? { ...prevMetadata, description } : prevMetadata))
  }

  return (
    <Block>
      <TextInput
        caption="Must be unique from all other issue templates, including Markdown templates."
        errorMessage={metadata.name.length === 0 && 'A name is required.'}
        label="Name"
        onChange={handleNameChange}
        placeholder="Bug report"
        required
        value={metadata.name}
      />
      <TextInput
        caption="Appears in the template chooser interface."
        errorMessage={metadata.description.length === 0 && 'A description is required.'}
        label="Description"
        onChange={handleDescriptionChange}
        placeholder="File a bug/issue"
        required
        value={metadata.description}
      />
    </Block>
  )
}
