import { arrayMove } from '@dnd-kit/sortable'

import { useElement } from '../../hooks/useElement'
import { useElementsActions } from '../../hooks/useElementsActions'
import type { DraggableProps } from '../../libs/dnd'
import type { CheckboxesElement } from '../../libs/issueForm'

import { Checkbox } from './Checkbox'
import { EditorBlock } from './EditorBlock'
import { IdInput } from './IdInput'
import { type Option, OptionsEditor } from './OptionsEditor'
import { TextInput } from './TextInput'

export function CheckboxesEditor({ _id, ...others }: CheckboxesEditorProps) {
  const checkboxes = useElement(_id, 'checkboxes')
  const { setElement } = useElementsActions()

  function handleDescriptionChange(description: string) {
    setElement({ ...checkboxes, attributes: { ...checkboxes.attributes, description } })
  }

  function handleIdChange(id: string) {
    setElement({ ...checkboxes, id })
  }

  function handleLabelChange(label: string) {
    setElement({ ...checkboxes, attributes: { ...checkboxes.attributes, label } })
  }

  function handleRequiredChange(required: boolean) {
    setElement({ ...checkboxes, validations: { ...checkboxes.validations, required } })
  }

  function handleOptionAddition() {
    const newOption = { _id: crypto.randomUUID(), label: 'New option' }

    setElement({
      ...checkboxes,
      attributes: { ...checkboxes.attributes, options: [...checkboxes.attributes.options, newOption] },
    })

    return newOption._id
  }

  function handleOptionChange(updatedId: Option['_id'], newLabel: Option['label']) {
    setElement({
      ...checkboxes,
      attributes: {
        ...checkboxes.attributes,
        options: checkboxes.attributes.options.map((option) => {
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
      ...checkboxes,
      attributes: {
        ...checkboxes.attributes,
        options: checkboxes.attributes.options.filter((option) => option._id !== deletedId),
      },
    })
  }

  function handleOptionReorder(fromIndex: number, toIndex: number) {
    setElement({
      ...checkboxes,
      attributes: {
        ...checkboxes.attributes,
        options: arrayMove(checkboxes.attributes.options, fromIndex, toIndex),
      },
    })
  }

  return (
    <EditorBlock
      collapsed={checkboxes._collapsed}
      excerpt={checkboxes.attributes.label}
      _id={_id}
      title="Checkboxes"
      {...others}
    >
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
      <IdInput onChange={handleIdChange} value={checkboxes.id} />
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
  _id: CheckboxesElement['_id']
}
