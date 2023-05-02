import { useAtom } from 'jotai'

import { issueFormMetadataAtom } from '../../atoms/issueForm'

import { EditorBlock } from './EditorBlock'
import { TextInput } from './TextInput'

export function MetadataEditor() {
  const [metadata, setMetadata] = useAtom(issueFormMetadataAtom)

  function handleNameChange(name: string) {
    setMetadata((prevMetadata) => ({ ...prevMetadata, name }))
  }

  function handleDescriptionChange(description: string) {
    setMetadata((prevMetadata) => ({ ...prevMetadata, description }))
  }

  return (
    <EditorBlock title="Metadata">
      <TextInput
        caption="Must be unique from all other issue templates, including Markdown templates."
        errorMessage={metadata.name.length === 0 && 'A name is required.'}
        label="Name"
        onChange={handleNameChange}
        required
        value={metadata.name}
      />
      <TextInput
        caption="Appears in the template chooser interface."
        errorMessage={metadata.description.length === 0 && 'A description is required.'}
        label="Description"
        onChange={handleDescriptionChange}
        required
        value={metadata.description}
      />
    </EditorBlock>
  )
}
