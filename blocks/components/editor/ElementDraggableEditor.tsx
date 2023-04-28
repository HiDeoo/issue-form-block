import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { CSSProperties } from 'react'

import type { ElementAtom } from '../../atoms/issueForm'

import { ElementEditor } from './ElementEditor'

export function ElementDraggableEditor({ atom }: ElementDraggableEditorProps) {
  const { attributes, isDragging, listeners, setActivatorNodeRef, setNodeRef, transform, transition } = useSortable({
    id: atom.toString(),
  })

  return (
    <ElementEditor
      atom={atom}
      attributes={attributes}
      isDragging={isDragging}
      listeners={listeners}
      setActivatorNodeRef={setActivatorNodeRef}
      setNodeRef={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    />
  )
}

interface ElementDraggableEditorProps {
  atom: ElementAtom
}

export type DraggableProps = Partial<ReturnType<typeof useSortable>> & {
  isDragOverlay?: boolean
  style?: CSSProperties
}