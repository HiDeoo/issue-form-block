import { arrayMove } from '@dnd-kit/sortable'
import { useAtom } from 'jotai'

import type { DropdownElementAtom } from '../../atoms/issueForm'
import type { DraggableProps } from '../../libs/dnd'

import { Checkbox } from './Checkbox'
import { EditorBlock } from './EditorBlock'
import { IdInput } from './IdInput'
import { type Option, OptionsEditor } from './OptionsEditor'
import { TextInput } from './TextInput'

export function DropdownEditor({ atom, ...others }: DropdownEditorProps) {
  const [dropdown, setDropdown] = useAtom(atom)

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

  function handleOptionAddition() {
    const newOption = { _id: crypto.randomUUID(), label: 'New option' }

    setDropdown((prevDropdown) => ({
      ...prevDropdown,
      attributes: {
        ...prevDropdown.attributes,
        options: [...prevDropdown.attributes.options, newOption],
      },
    }))

    return newOption._id
  }

  function handleOptionChange(updatedId: Option['_id'], newLabel: Option['label']) {
    setDropdown((prevDropdown) => ({
      ...prevDropdown,
      attributes: {
        ...prevDropdown.attributes,
        options: prevDropdown.attributes.options.map((option) => {
          if (option._id !== updatedId) {
            return option
          }

          return { ...option, label: newLabel }
        }),
      },
    }))
  }

  function handleOptionDeletion(deletedId: Option['_id']) {
    setDropdown((prevDropdown) => ({
      ...prevDropdown,
      attributes: {
        ...prevDropdown.attributes,
        options: prevDropdown.attributes.options.filter((option) => option._id !== deletedId),
      },
    }))
  }

  function handleOptionReorder(fromIndex: number, toIndex: number) {
    setDropdown((prevDropdown) => ({
      ...prevDropdown,
      attributes: {
        ...prevDropdown.attributes,
        options: arrayMove(prevDropdown.attributes.options, fromIndex, toIndex),
      },
    }))
  }

  return (
    <EditorBlock
      atom={atom}
      collapsed={dropdown._collapsed}
      excerpt={dropdown.attributes.label}
      title="Dropdown"
      {...others}
    >
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
        onReorder={handleOptionReorder}
        options={dropdown.attributes.options}
      />
      <Checkbox
        caption="Determines if the user can select more than one option."
        checked={dropdown.attributes.multiple}
        label="Multiple"
        onChange={handleMultipleChange}
      />
      <IdInput onChange={handleIdChange} value={dropdown.id} />
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
