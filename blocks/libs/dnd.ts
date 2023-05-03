import {
  defaultDropAnimationSideEffects,
  type CollisionDetection,
  type DropAnimation,
  type Modifiers,
  type ScreenReaderInstructions,
  closestCenter,
  type Announcements,
  type UniqueIdentifier,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import {
  verticalListSortingStrategy,
  type SortingStrategy,
  type useSortable,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import type { CSSProperties } from 'react'

export function useDnd(itemType: string, ids: UniqueIdentifier[]): UseDndReturnValue {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  return {
    announcements: getDndAnnouncements(itemType, ids),
    sensors,
  }
}

export function getDndOptions(itemType: string, restrictToParent = false): DndOptions {
  return {
    collisionDetection: closestCenter,
    dropAnimation: {
      sideEffects: defaultDropAnimationSideEffects({
        styles: {
          active: {
            opacity: '0.5',
          },
        },
      }),
    },
    modifiers: [restrictToVerticalAxis, restrictToParent ? restrictToParentElement : restrictToWindowEdges],
    screenReaderInstructions: {
      draggable: `
        To reorder an ${itemType}, press the space bar.
        While sorting, use the up and down arrow keys to move the ${itemType}.
        Press space again to drop the ${itemType} in its new position, or press escape to cancel.
      `,
    },
    sortable: {
      strategy: verticalListSortingStrategy,
    },
  }
}

export function getUniqueIdentifierIndex(ids: UniqueIdentifier[], id: UniqueIdentifier) {
  return ids.indexOf(`${id}`) + 1
}

export function setDragCursor() {
  document.body.style.setProperty('cursor', 'grabbing')
}

export function resetDragCursor() {
  document.body.style.setProperty('cursor', '')
}

function getDndAnnouncements(itemType: string, ids: UniqueIdentifier[]): Announcements {
  return {
    onDragStart({ active: { id } }) {
      return `Picked up ${itemType} in position ${getUniqueIdentifierIndex(ids, id)} of ${ids.length}.`
    },
    onDragOver({ over }) {
      if (!over) {
        return
      }

      return `${itemType} was moved into position ${getUniqueIdentifierIndex(ids, over.id)} of ${ids.length}.`
    },
    onDragEnd({ over }) {
      if (!over) {
        return
      }

      return `${itemType} was dropped at position ${getUniqueIdentifierIndex(ids, over.id)} of ${ids.length}.`
    },
    onDragCancel({ active: { id } }) {
      return `Reordering was cancelled and the ${itemType} returned to position ${getUniqueIdentifierIndex(
        ids,
        id
      )} of ${ids.length}.`
    },
  }
}

export type DraggableProps = Partial<ReturnType<typeof useSortable>> & {
  isDragOverlay?: boolean
  style?: CSSProperties
}

interface UseDndReturnValue {
  announcements: Announcements
  sensors: ReturnType<typeof useSensors>
}

interface DndOptions {
  collisionDetection: CollisionDetection
  dropAnimation: DropAnimation
  modifiers: Modifiers
  screenReaderInstructions: ScreenReaderInstructions
  sortable: {
    strategy: SortingStrategy
  }
}
