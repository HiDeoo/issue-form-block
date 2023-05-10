import { DndContext, DragOverlay, type DragStartEvent, type UniqueIdentifier, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'

import { useElements } from '../../hooks/useElements'
import { useElementsActions } from '../../hooks/useElementsActions'
import { getDndOptions, getUniqueIdentifierIndex, resetDragCursor, setDragCursor, useDnd } from '../../libs/dnd'

import { ElementDraggableEditor } from './ElementDraggableEditor'
import { ElementEditor } from './ElementEditor'

const dndItemType = 'element'
const dndOptions = getDndOptions(dndItemType)

export function ElementsEditor() {
  const elements = useElements()
  const { setElementsOrder } = useElementsActions()

  const elementIds = elements.map((element) => element._id)

  const { announcements, sensors } = useDnd(dndItemType, elementIds)

  const [draggedElementId, setDraggedElementId] = useState<UniqueIdentifier | undefined>(undefined)
  const draggedElement = useMemo(
    () => elements.find((element) => element._id === draggedElementId),
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
      setElementsOrder(arrayMove(elements, draggedElementIndex - 1, overIndex - 1))
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
          <ElementDraggableEditor _id={element._id} key={element._id} type={element.type} />
        ))}
      </SortableContext>
      <DragOverlay dropAnimation={dndOptions.dropAnimation}>
        {draggedElement ? <ElementEditor _id={draggedElement._id} isDragOverlay type={draggedElement.type} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
