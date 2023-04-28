import { useAtom } from 'jotai'

import { issueFormMetadataAtom } from '../../atoms/issueForm'
import { TextInput } from '../TextInput'

import { EditorBlock } from './EditorBlock'

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
    </EditorBlock>
  )
}
