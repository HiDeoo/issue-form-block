import { DndContext, DragOverlay, type DragStartEvent, type UniqueIdentifier, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useAtom } from 'jotai'
import { useMemo, useState } from 'react'

import { issueFormElementsAtom } from '../../atoms/issueForm'
import { getDndOptions, getUniqueIdentifierIndex, resetDragCursor, setDragCursor, useDnd } from '../../libs/dnd'

import { ElementDraggableEditor } from './ElementDraggableEditor'
import { ElementEditor } from './ElementEditor'

const dndItemType = 'element'
const dndOptions = getDndOptions(dndItemType)

export function ElementsEditor() {
  const [elements, setElements] = useAtom(issueFormElementsAtom)
  const elementIds = elements.map((element) => element.toString())

  const { announcements, sensors } = useDnd(dndItemType, elementIds)

  const [draggedElementId, setDraggedElementId] = useState<UniqueIdentifier | undefined>(undefined)
  const draggedElementAtom = useMemo(
    () => elements.find((element) => element.toString() === draggedElementId),
    [draggedElementId, elements]
  )

  function handleDragStart({ active }: DragStartEvent) {
    setDraggedElementId(active.id)
    setDragCursor()
  }

  function handleDragCancel() {
    setDraggedElementId(undefined)
    resetDragCursor()
  }

  function handleDragEnd({ over }: DragEndEvent) {
    setDraggedElementId(undefined)
    resetDragCursor()

    if (!over || !draggedElementId) {
      return
    }

    const overIndex = getUniqueIdentifierIndex(elementIds, over.id)
    const draggedElementIndex = getUniqueIdentifierIndex(elementIds, draggedElementId)

    if (draggedElementIndex !== overIndex) {
      setElements(arrayMove(elements, draggedElementIndex - 1, overIndex - 1))
    }
  }

  return (
    <DndContext
      accessibility={{ announcements, screenReaderInstructions: dndOptions.screenReaderInstructions }}
      collisionDetection={dndOptions.collisionDetection}
      modifiers={dndOptions.modifiers}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <SortableContext items={elementIds} strategy={dndOptions.sortable.strategy}>
        {elements.map((element) => (
          <ElementDraggableEditor atom={element} key={element.toString()} />
        ))}
      </SortableContext>
      <DragOverlay dropAnimation={dndOptions.dropAnimation}>
        {draggedElementAtom ? <ElementEditor atom={draggedElementAtom} isDragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}
