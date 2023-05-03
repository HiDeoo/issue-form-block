import { XIcon } from '@primer/octicons-react'
import { Box, Button, FormControl, IconButton, TextInput, Tooltip } from '@primer/react'
import { useEffect, useRef } from 'react'

const textInputStyle = { bg: 'canvas.inset' }

// TODO(HiDeoo) reorder
// TODO(HiDeoo) Enter shortcut
// TODO(HiDeoo) Enter not at the end of the option list
export function OptionsEditor({ label, name, onAdd, onChange, onDelete, options }: OptionsEditorProps) {
  const optionIdToFocus = useRef<Option['id'] | undefined>(undefined)

  function handleNewOptionClick() {
    const newOptionId = onAdd()

    optionIdToFocus.current = newOptionId
  }

  useEffect(() => {
    if (optionIdToFocus.current === undefined) {
      return
    }

    const newOptionInput = document.querySelector<HTMLInputElement>(
      `#${getOptionTextInputId(name, optionIdToFocus.current)}`
    )

    if (newOptionInput) {
      newOptionInput.focus()
    }

    optionIdToFocus.current = undefined
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl required>
        <FormControl.Label>Options</FormControl.Label>
        <FormControl.Caption>{label}</FormControl.Caption>
      </FormControl>
      {options.map((option, index) => (
        <OptionEditor
          deletable={options.length > 1}
          key={option.id}
          index={index}
          name={name}
          onChange={onChange}
          onDelete={onDelete}
          option={option}
        />
      ))}
      <Button onClick={handleNewOptionClick} variant="outline">
        Add new option
      </Button>
    </Box>
  )
}

export function OptionEditor({ deletable, index, name, onChange, onDelete, option }: OptionEditorProps) {
  function handleDeleteClick() {
    onDelete(option.id)
  }

  function handleLabelChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(option.id, event.target.value)
  }

  const isEmpty = option.label.trim().length === 0

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextInput
          aria-label={`Option at index ${index} named ${option.label}`}
          block
          id={getOptionTextInputId(name, option.id)}
          onChange={handleLabelChange}
          sx={textInputStyle}
          validationStatus={isEmpty ? 'error' : undefined}
          value={option.label}
        />
        <Tooltip aria-label="Delete option" direction="w">
          <IconButton
            aria-label="Delete option"
            disabled={!deletable}
            icon={XIcon}
            onClick={handleDeleteClick}
            variant="danger"
          />
        </Tooltip>
      </Box>
      {isEmpty ? <FormControl.Validation variant="error">An option cannot be empty.</FormControl.Validation> : null}
    </>
  )
}

function getOptionTextInputId(name: OptionsEditorProps['name'], optionId: Option['id']) {
  return `${name}-option-${optionId}`
}

interface OptionsEditorProps {
  label: string
  name: string
  onAdd: () => Option['id']
  onChange: (updatedId: Option['id'], newLabel: Option['label']) => void
  onDelete: (deletedId: Option['id']) => void
  options: Option[]
}

interface OptionEditorProps {
  deletable: boolean
  index: number
  name: OptionsEditorProps['name']
  onChange: OptionsEditorProps['onChange']
  onDelete: OptionsEditorProps['onDelete']
  option: Option
}

export interface Option {
  id: string
  label: string
}
