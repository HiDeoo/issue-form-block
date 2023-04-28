import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragStartEvent,
  type UniqueIdentifier,
  type DragEndEvent,
  defaultDropAnimationSideEffects,
  type DropAnimation,
  type ScreenReaderInstructions,
  type Announcements,
} from '@dnd-kit/core'
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useAtom } from 'jotai'
import { useEffect, useMemo, useRef, useState } from 'react'

import { issueFormElementsAtom } from '../../atoms/issueForm'

import { ElementDraggableEditor } from './ElementDraggableEditor'
import { ElementEditor } from './ElementEditor'

const dragModifiers = [restrictToVerticalAxis, restrictToWindowEdges]

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
}

const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: `
    To reorder an element, press the space bar.
    While sorting, use the up and down arrow keys to move the element.
    Press space again to drop the element in its new position, or press escape to cancel.
  `,
}

export function ElementsEditor() {
  const [elements, setElements] = useAtom(issueFormElementsAtom)
  const elementIds = elements.map((element) => element.toString())
  const getElementPositionById = (id: UniqueIdentifier) => elementIds.indexOf(`${id}`) + 1

  const [draggedElementId, setDraggedElementId] = useState<UniqueIdentifier | undefined>(undefined)
  const draggedElementIndex = draggedElementId ? getElementPositionById(draggedElementId) : -1
  const draggedElementAtom = useMemo(
    () => elements.find((element) => element.toString() === draggedElementId),
    [draggedElementId, elements]
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const isFirstAnnouncement = useRef(true)

  const announcements: Announcements = {
    onDragStart({ active: { id } }) {
      return `Picked up element in position ${getElementPositionById(id)} of ${elementIds.length}.`
    },
    onDragOver({ over }) {
      // The first `onDragOver` event doesn't need to be announced because it is called immediately after the
      // `onDragStart` announcement and is redundant.
      if (isFirstAnnouncement.current === true) {
        isFirstAnnouncement.current = false
        return
      }

      if (!over) {
        return
      }

      return `Element was moved into position ${getElementPositionById(over.id)} of ${elementIds.length}.`
    },
    onDragEnd({ over }) {
      if (!over) {
        return
      }

      return `Element was dropped at position ${getElementPositionById(over.id)} of ${elementIds.length}.`
    },
    onDragCancel({ active: { id } }) {
      return `Reordering was cancelled and the element returned to position ${getElementPositionById(id)} of ${
        elementIds.length
      }.`
    },
  }

  useEffect(() => {
    if (!draggedElementId) {
      isFirstAnnouncement.current = true
    }
  }, [draggedElementId])

  function handleDragStart({ active }: DragStartEvent) {
    setDraggedElementId(active.id)
    document.body.style.setProperty('cursor', 'grabbing')
  }

  function handleDragCancel() {
    setDraggedElementId(undefined)
    document.body.style.setProperty('cursor', '')
  }

  function handleDragEnd({ over }: DragEndEvent) {
    setDraggedElementId(undefined)
    document.body.style.setProperty('cursor', '')

    if (!over) {
      return
    }

    const overIndex = getElementPositionById(over.id)
    if (draggedElementIndex !== overIndex) {
      setElements(arrayMove(elements, draggedElementIndex - 1, overIndex - 1))
    }
  }

  return (
    <DndContext
      accessibility={{ announcements, screenReaderInstructions }}
      collisionDetection={closestCenter}
      modifiers={dragModifiers}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <SortableContext items={elementIds} strategy={verticalListSortingStrategy}>
        {elements.map((element) => (
          <ElementDraggableEditor atom={element} key={element.toString()} />
        ))}
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimation}>
        {draggedElementAtom ? <ElementEditor atom={draggedElementAtom} isDragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}
