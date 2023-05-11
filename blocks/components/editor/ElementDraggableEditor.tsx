import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import type { IssueFormElement } from '../../libs/elements'

import { ElementEditor } from './ElementEditor'

export function ElementDraggableEditor({ _id, type }: ElementDraggableEditorProps) {
  const { attributes, isDragging, listeners, setActivatorNodeRef, setNodeRef, transform, transition } = useSortable({
    id: _id,
  })

  return (
    <ElementEditor
      _id={_id}
      attributes={attributes}
      isDragging={isDragging}
      listeners={listeners}
      setActivatorNodeRef={setActivatorNodeRef}
      setNodeRef={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      type={type}
    />
  )
}

export interface ElementDraggableEditorProps {
  _id: IssueFormElement['_id']
  type: IssueFormElement['type']
}
