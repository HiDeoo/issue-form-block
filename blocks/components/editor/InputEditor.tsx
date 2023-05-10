import { useElement } from '../../hooks/useElement'
import { useElementsActions } from '../../hooks/useElementsActions'
import type { DraggableProps } from '../../libs/dnd'
import type { InputElement } from '../../libs/issueForm'

import { Checkbox } from './Checkbox'
import { EditorBlock } from './EditorBlock'
import { IdInput } from './IdInput'
import { TextInput } from './TextInput'

export function InputEditor({ _id, ...others }: InputEditorProps) {
  const input = useElement(_id, 'input')
  const { setElement } = useElementsActions()

  function handleDescriptionChange(description: string) {
    setElement({ ...input, attributes: { ...input.attributes, description } })
  }

  function handleIdChange(id: string) {
    setElement({ ...input, id })
  }

  function handleLabelChange(label: string) {
    setElement({ ...input, attributes: { ...input.attributes, label } })
  }

  function handlePlaceholderChange(placeholder: string) {
    setElement({ ...input, attributes: { ...input.attributes, placeholder } })
  }

  function handleRequiredChange(required: boolean) {
    setElement({ ...input, validations: { ...input.validations, required } })
  }

  function handleValueChange(value: string) {
    setElement({ ...input, attributes: { ...input.attributes, value } })
  }

  return (
    <EditorBlock collapsed={input._collapsed} excerpt={input.attributes.label} _id={_id} title="Input" {...others}>
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
      <IdInput onChange={handleIdChange} value={input.id} />
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
  _id: InputElement['_id']
}
