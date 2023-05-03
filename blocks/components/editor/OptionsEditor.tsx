import { DndContext, type DragStartEvent, type DragEndEvent, DragOverlay, type UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GrabberIcon, XIcon } from '@primer/octicons-react'
import { Box, Button, FormControl, IconButton, TextInput, Tooltip } from '@primer/react'
import { useEffect, useMemo, useRef, useState } from 'react'

import {
  getDndOptions,
  type DraggableProps,
  useDnd,
  getUniqueIdentifierIndex,
  setDragCursor,
  resetDragCursor,
} from '../../libs/dnd'

const dndItemType = 'option'
const dndOptions = getDndOptions(dndItemType, true)

const textInputStyle = { bg: 'canvas.inset' }

const dragHandleStyle = {
  bg: 'unset',
  border: 0,
  boxShadow: 'none',
  cursor: 'grab',
  touchAction: 'none',
  ':hover,:focus': {
    bg: 'unset',
  },
  '> svg': {
    height: 22,
    width: 22,
  },
}

export function OptionsEditor({ label, onAdd, onReorder, options, ...others }: OptionsEditorProps) {
  const optionIds = useMemo(() => options.map((option) => option.id), [options])

  const optionIdToFocus = useRef<Option['id'] | undefined>(undefined)

  const [draggedOptionId, setDraggedOptionId] = useState<UniqueIdentifier | undefined>(undefined)
  const draggedOption = useMemo(
    () => options.find((option) => option.id === draggedOptionId),
    [draggedOptionId, options]
  )

  const { announcements, sensors } = useDnd(dndItemType, optionIds)

  useEffect(() => {
    if (optionIdToFocus.current === undefined) {
      return
    }

    const newOptionInput = document.querySelector<HTMLInputElement>(
      `#${getOptionTextInputId(others.name, optionIdToFocus.current)}`
    )

    if (newOptionInput) {
      newOptionInput.focus()
    }

    optionIdToFocus.current = undefined
  })

  function handleNewOptionClick() {
    const newOptionId = onAdd()

    optionIdToFocus.current = newOptionId
  }

  function handleDragStart({ active }: DragStartEvent) {
    setDraggedOptionId(active.id)
    setDragCursor()
  }

  function handleDragCancel() {
    setDraggedOptionId(undefined)
    resetDragCursor()
  }

  function handleDragEnd({ over }: DragEndEvent) {
    setDraggedOptionId(undefined)
    resetDragCursor()

    if (!over || !draggedOptionId) {
      return
    }

    const overIndex = getUniqueIdentifierIndex(optionIds, over.id)
    const draggedOptionIndex = getUniqueIdentifierIndex(optionIds, draggedOptionId)

    if (draggedOptionIndex !== overIndex) {
      onReorder(draggedOptionIndex - 1, overIndex - 1)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl required>
        <FormControl.Label>Options</FormControl.Label>
        <FormControl.Caption>{label}</FormControl.Caption>
      </FormControl>
      <DndContext
        accessibility={{ announcements, screenReaderInstructions: dndOptions.screenReaderInstructions }}
        autoScroll={false}
        collisionDetection={dndOptions.collisionDetection}
        modifiers={dndOptions.modifiers}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <SortableContext items={optionIds} strategy={dndOptions.sortable.strategy}>
          {options.map((option, index) => (
            <OptionDraggableEditor
              deletable={options.length > 1}
              key={option.id}
              index={index}
              option={option}
              {...others}
            />
          ))}
        </SortableContext>
        <DragOverlay dropAnimation={dndOptions.dropAnimation}>
          {draggedOption ? (
            <OptionEditor
              deletable={false}
              index={getUniqueIdentifierIndex(optionIds, draggedOption.id)}
              isDragOverlay
              option={draggedOption}
              {...others}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <Button onClick={handleNewOptionClick} variant="outline">
        Add new option
      </Button>
    </Box>
  )
}

function OptionDraggableEditor(props: OptionDraggableEditorProps) {
  const { attributes, isDragging, listeners, setActivatorNodeRef, setNodeRef, transform, transition } = useSortable({
    id: props.option.id,
  })

  return (
    <OptionEditor
      attributes={attributes}
      isDragging={isDragging}
      listeners={listeners}
      setActivatorNodeRef={setActivatorNodeRef}
      setNodeRef={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...props}
    />
  )
}

function OptionEditor({
  attributes,
  deletable,
  index,
  isDragging,
  isDragOverlay,
  listeners,
  name,
  onChange,
  onDelete,
  option,
  setActivatorNodeRef,
  setNodeRef,
  style,
}: OptionEditorProps) {
  const dragHandle = (
    <IconButton
      aria-label="Reorder option"
      icon={GrabberIcon}
      ref={setActivatorNodeRef}
      sx={dragHandleStyle}
      {...attributes}
      {...listeners}
    />
  )

  function handleDeleteClick() {
    onDelete(option.id)
  }

  function handleLabelChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(option.id, event.target.value)
  }

  const isEmpty = option.label.trim().length === 0
  const isDragHandleTooltipHidden = isDragOverlay ?? isDragging

  return (
    <Box ref={setNodeRef} style={style} sx={{ opacity: isDragging ? 0.5 : 1 }}>
      <Box sx={{ alignItems: 'center', display: 'flex', gap: 2 }}>
        {isDragHandleTooltipHidden ? (
          <Box>{dragHandle}</Box>
        ) : (
          <Tooltip aria-label="Reorder option" direction="e">
            {dragHandle}
          </Tooltip>
        )}
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
    </Box>
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
  onReorder: (fromIndex: number, toIndex: number) => void
  options: Option[]
}

interface OptionDraggableEditorProps {
  deletable: boolean
  index: number
  isDragOverlay?: boolean
  name: OptionsEditorProps['name']
  onChange: OptionsEditorProps['onChange']
  onDelete: OptionsEditorProps['onDelete']
  option: Option
}

type OptionEditorProps = OptionDraggableEditorProps & DraggableProps

export interface Option {
  id: string
  label: string
}
