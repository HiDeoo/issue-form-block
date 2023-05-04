import { useAtom } from 'jotai'

import type { InputElementAtom } from '../../atoms/issueForm'
import type { DraggableProps } from '../../libs/dnd'

import { Checkbox } from './Checkbox'
import { EditorBlock } from './EditorBlock'
import { TextInput } from './TextInput'

export function InputEditor({ atom, ...others }: InputEditorProps) {
  const [input, setInput] = useAtom(atom)

  function handleDescriptionChange(description: string) {
    setInput((prevInput) => ({ ...prevInput, attributes: { ...prevInput.attributes, description } }))
  }

  function handleIdChange(id: string) {
    setInput((prevInput) => ({ ...prevInput, id }))
  }

  function handleLabelChange(label: string) {
    setInput((prevInput) => ({ ...prevInput, attributes: { ...prevInput.attributes, label } }))
  }

  function handlePlaceholderChange(placeholder: string) {
    setInput((prevInput) => ({ ...prevInput, attributes: { ...prevInput.attributes, placeholder } }))
  }

  function handleRequiredChange(required: boolean) {
    setInput((prevInput) => ({ ...prevInput, validations: { ...prevInput.validations, required } }))
  }

  function handleValueChange(value: string) {
    setInput((prevInput) => ({ ...prevInput, attributes: { ...prevInput.attributes, value } }))
  }

  return (
    <EditorBlock atom={atom} collapsed={input._collapsed} excerpt={input.attributes.label} title="Input" {...others}>
      <TextInput
        caption="A brief description of the expected user input."
        errorMessage={input.attributes.label.length === 0 && 'A label is required.'}
        label="Label"
        onChange={handleLabelChange}
        required
        value={input.attributes.label}
      />
      <TextInput
        caption="A description of the input to provide context or guidance."
        label="Description"
        onChange={handleDescriptionChange}
        value={input.attributes.description}
      />
      <TextInput
        caption="A placeholder that renders in the input when empty."
        label="Placeholder"
        onChange={handlePlaceholderChange}
        value={input.attributes.placeholder}
      />
      <TextInput
        caption="Text pre-filled in the input."
        label="Value"
        onChange={handleValueChange}
        value={input.attributes.value}
      />
      <TextInput
        caption="Unique in the form definition and can only use alpha-numeric characters, -, and _."
        label="Identifier"
        onChange={handleIdChange}
        value={input.id}
      />
      <Checkbox
        caption="Prevents form submission for public repositories until the input is completed."
        checked={input.validations?.required}
        label="Required"
        onChange={handleRequiredChange}
      />
    </EditorBlock>
  )
}

interface InputEditorProps extends DraggableProps {
  atom: InputElementAtom
}
