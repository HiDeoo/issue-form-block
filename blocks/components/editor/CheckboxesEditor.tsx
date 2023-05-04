import { arrayMove } from '@dnd-kit/sortable'
import { useAtom } from 'jotai'
import { nanoid } from 'nanoid'

import type { CheckboxesElementAtom } from '../../atoms/issueForm'
import type { DraggableProps } from '../../libs/dnd'

import { Checkbox } from './Checkbox'
import { EditorBlock } from './EditorBlock'
import { type Option, OptionsEditor } from './OptionsEditor'
import { TextInput } from './TextInput'

export function CheckboxesEditor({ atom, ...others }: CheckboxesEditorProps) {
  const [checkboxes, setCheckboxes] = useAtom(atom)

  function handleDescriptionChange(description: string) {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      attributes: { ...prevCheckboxes.attributes, description },
    }))
  }

  function handleIdChange(id: string) {
    setCheckboxes((prevCheckboxes) => ({ ...prevCheckboxes, id }))
  }

  function handleLabelChange(label: string) {
    setCheckboxes((prevCheckboxes) => ({ ...prevCheckboxes, attributes: { ...prevCheckboxes.attributes, label } }))
  }

  function handleRequiredChange(required: boolean) {
    setCheckboxes((prevCheckboxes) => ({ ...prevCheckboxes, validations: { ...prevCheckboxes.validations, required } }))
  }

  function handleOptionAddition() {
    const newOption = { _id: nanoid(), label: 'New option' }

    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      attributes: {
        ...prevCheckboxes.attributes,
        options: [...prevCheckboxes.attributes.options, newOption],
      },
    }))

    return newOption._id
  }

  function handleOptionChange(updatedId: Option['_id'], newLabel: Option['label']) {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      attributes: {
        ...prevCheckboxes.attributes,
        options: prevCheckboxes.attributes.options.map((option) => {
          if (option._id !== updatedId) {
            return option
          }

          return { ...option, label: newLabel }
        }),
      },
    }))
  }

  function handleOptionDeletion(deletedId: Option['_id']) {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      attributes: {
        ...prevCheckboxes.attributes,
        options: prevCheckboxes.attributes.options.filter((option) => option._id !== deletedId),
      },
    }))
  }

  function handleOptionReorder(fromIndex: number, toIndex: number) {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      attributes: {
        ...prevCheckboxes.attributes,
        options: arrayMove(prevCheckboxes.attributes.options, fromIndex, toIndex),
      },
    }))
  }

  return (
    <EditorBlock atom={atom} collapsed={checkboxes._collapsed} title="Checkboxes" {...others}>
      <TextInput
        caption="A brief description of the expected user input."
        errorMessage={checkboxes.attributes.label.length === 0 && 'A label is required.'}
        label="Label"
        onChange={handleLabelChange}
        required
        value={checkboxes.attributes.label}
      />
      <TextInput
        caption="A description of the set of checkboxes to provide context or guidance."
        label="Description"
        onChange={handleDescriptionChange}
        value={checkboxes.attributes.description}
      />
      <OptionsEditor
        label="The list of checkboxes the user can select."
        name="checkbox-options"
        onAdd={handleOptionAddition}
        onChange={handleOptionChange}
        onDelete={handleOptionDeletion}
        onReorder={handleOptionReorder}
        options={checkboxes.attributes.options}
      />
      <TextInput
        caption="Unique in the form definition and can only use alpha-numeric characters, -, and _."
        label="Identifier"
        onChange={handleIdChange}
        value={checkboxes.id}
      />
      <Checkbox
        caption="Prevents form submission for public repositories until the set of checkboxes is completed."
        checked={checkboxes.validations?.required}
        label="Required"
        onChange={handleRequiredChange}
      />
    </EditorBlock>
  )
}

interface CheckboxesEditorProps extends DraggableProps {
  atom: CheckboxesElementAtom
}
