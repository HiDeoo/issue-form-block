import { arrayMove } from '@dnd-kit/sortable'

import { useElement } from '../../hooks/useElement'
import { useElementsActions } from '../../hooks/useElementsActions'
import type { DraggableProps } from '../../libs/dnd'
import type { DropdownElement } from '../../libs/issueForm'

import { Checkbox } from './Checkbox'
import { EditorBlock } from './EditorBlock'
import { IdInput } from './IdInput'
import { type Option, OptionsEditor } from './OptionsEditor'
import { TextInput } from './TextInput'

export function DropdownEditor({ _id, ...others }: DropdownEditorProps) {
  const dropdown = useElement(_id, 'dropdown')
  const { setElement } = useElementsActions()

  function handleDescriptionChange(description: string) {
    setElement({ ...dropdown, attributes: { ...dropdown.attributes, description } })
  }

  function handleIdChange(id: string) {
    setElement({ ...dropdown, id })
  }

  function handleLabelChange(label: string) {
    setElement({ ...dropdown, attributes: { ...dropdown.attributes, label } })
  }

  function handleMultipleChange(multiple: boolean) {
    setElement({ ...dropdown, attributes: { ...dropdown.attributes, multiple } })
  }

  function handleRequiredChange(required: boolean) {
    setElement({ ...dropdown, validations: { ...dropdown.validations, required } })
  }

  function handleOptionAddition() {
    const newOption = { _id: crypto.randomUUID(), label: 'New option' }

    setElement({
      ...dropdown,
      attributes: { ...dropdown.attributes, options: [...dropdown.attributes.options, newOption] },
    })

    return newOption._id
  }

  function handleOptionChange(updatedId: Option['_id'], newLabel: Option['label']) {
    setElement({
      ...dropdown,
      attributes: {
        ...dropdown.attributes,
        options: dropdown.attributes.options.map((option) => {
          if (option._id !== updatedId) {
            return option
          }

          return { ...option, label: newLabel }
        }),
      },
    })
  }

  function handleOptionDeletion(deletedId: Option['_id']) {
    setElement({
      ...dropdown,
      attributes: {
        ...dropdown.attributes,
        options: dropdown.attributes.options.filter((option) => option._id !== deletedId),
      },
    })
  }

  function handleOptionReorder(fromIndex: number, toIndex: number) {
    setElement({
      ...dropdown,
      attributes: {
        ...dropdown.attributes,
        options: arrayMove(dropdown.attributes.options, fromIndex, toIndex),
      },
    })
  }

  return (
    <EditorBlock
      collapsed={dropdown._collapsed}
      excerpt={dropdown.attributes.label}
      _id={_id}
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
  _id: DropdownElement['_id']
}
