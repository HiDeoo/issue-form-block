import { useAtom, useSetAtom } from 'jotai'
import { nanoid } from 'nanoid'

import { issueFormElementsAtom, type DropdownElementAtom } from '../../atoms/issueForm'

import { Checkbox } from './Checkbox'
import { EditorBlock } from './EditorBlock'
import type { DraggableProps } from './ElementDraggableEditor'
import { type Option, OptionsEditor } from './OptionsEditor'
import { TextInput } from './TextInput'

// TODO(HiDeoo) options reordering
export function DropdownEditor({ atom, ...others }: DropdownEditorProps) {
  const [dropdown, setDropdown] = useAtom(atom)
  const setElements = useSetAtom(issueFormElementsAtom)

  function handleDescriptionChange(description: string) {
    setDropdown((prevDropdown) => ({ ...prevDropdown, attributes: { ...prevDropdown.attributes, description } }))
  }

  function handleIdChange(id: string) {
    setDropdown((prevDropdown) => ({ ...prevDropdown, id }))
  }

  function handleLabelChange(label: string) {
    setDropdown((prevDropdown) => ({ ...prevDropdown, attributes: { ...prevDropdown.attributes, label } }))
  }

  function handleMultipleChange(multiple: boolean) {
    setDropdown((prevDropdown) => ({ ...prevDropdown, attributes: { ...prevDropdown.attributes, multiple } }))
  }

  function handleRequiredChange(required: boolean) {
    setDropdown((prevDropdown) => ({ ...prevDropdown, validations: { ...prevDropdown.validations, required } }))
  }

  function handleDeleteClick() {
    setElements((elements) => elements.filter((element) => element !== atom))
  }

  function handleOptionAddition() {
    const newOption = { id: nanoid(), label: 'New option' }

    setDropdown((prevDropdown) => ({
      ...prevDropdown,
      attributes: {
        ...prevDropdown.attributes,
        options: [...prevDropdown.attributes.options, newOption],
      },
    }))

    return newOption.id
  }

  function handleOptionChange(updatedId: Option['id'], newLabel: Option['label']) {
    setDropdown((prevDropdown) => ({
      ...prevDropdown,
      attributes: {
        ...prevDropdown.attributes,
        options: prevDropdown.attributes.options.map((option) => {
          if (option.id !== updatedId) {
            return option
          }

          return { ...option, label: newLabel }
        }),
      },
    }))
  }

  function handleOptionDeletion(deletedId: Option['id']) {
    setDropdown((prevDropdown) => ({
      ...prevDropdown,
      attributes: {
        ...prevDropdown.attributes,
        options: prevDropdown.attributes.options.filter((option) => option.id !== deletedId),
      },
    }))
  }

  return (
    <EditorBlock onDelete={handleDeleteClick} title="Dropdown" {...others}>
      <TextInput
        caption="A brief description of the expected user input."
        errorMessage={dropdown.attributes.label.length === 0 && 'A label is required.'}
        label="Label"
        onChange={handleLabelChange}
        required
        value={dropdown.attributes.label}
      />
      <TextInput
        caption="A description of the dropdown to provide context or guidance."
        label="Description"
        onChange={handleDescriptionChange}
        value={dropdown.attributes.description}
      />
      <OptionsEditor
        label="The list of options the user can choose from."
        name="dropdown-options"
        onAdd={handleOptionAddition}
        onChange={handleOptionChange}
        onDelete={handleOptionDeletion}
        options={dropdown.attributes.options}
      />
      <Checkbox
        caption="Determines if the user can select more than one option."
        checked={dropdown.attributes.multiple}
        label="Multiple"
        onChange={handleMultipleChange}
      />
      <TextInput
        caption="Unique in the form definition and can only use alpha-numeric characters, -, and _."
        label="Identifier"
        onChange={handleIdChange}
        value={dropdown.id}
      />
      <Checkbox
        caption="Prevents form submission for public repositories until the dropdown is completed."
        checked={dropdown.validations?.required}
        label="Required"
        onChange={handleRequiredChange}
      />
    </EditorBlock>
  )
}

interface DropdownEditorProps extends DraggableProps {
  atom: DropdownElementAtom
}
