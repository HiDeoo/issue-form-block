import { useMetadata } from '../../hooks/useMetadata'
import { useMetadataActions } from '../../hooks/useMetadataActions'

import { EditorBlock } from './EditorBlock'
import { TextInput } from './TextInput'
import { TokensEditor, type Token } from './TokensEditor'

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

  function handleAssigneesAddition(newTexts: Token['text'][]) {
    setMetadata({
      assignees: [
        ...metadata.assignees,
        ...newTexts.map((text) => ({
          _id: crypto.randomUUID(),
          text,
        })),
      ],
    })
  }

  function handleAssigneesDeletion(deletedId: Token['_id']) {
    setMetadata({ assignees: metadata.assignees.filter((assignee) => assignee._id !== deletedId) })
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
      <TokensEditor
        caption="People who will be automatically assigned to issues created with this issue form."
        label="Assignees"
        onAdd={handleAssigneesAddition}
        onDelete={handleAssigneesDeletion}
        tokens={metadata.assignees}
      />
    </EditorBlock>
  )
}
