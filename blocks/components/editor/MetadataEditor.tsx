import { useMetadata } from '../../hooks/useMetadata'
import { useMetadataActions } from '../../hooks/useMetadataActions'

import { EditorBlock } from './EditorBlock'
import { TextInput } from './TextInput'

export function MetadataEditor() {
  const metadata = useMetadata()
  const { setMetadata } = useMetadataActions()

  function handleNameChange(name: string) {
    setMetadata({ name })
  }

  function handleDescriptionChange(description: string) {
    setMetadata({ description })
  }

  function handleTitleChange(title: string) {
    setMetadata({ title })
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
      <TextInput caption="The issue default title." label="Title" onChange={handleTitleChange} value={metadata.title} />
    </EditorBlock>
  )
}
