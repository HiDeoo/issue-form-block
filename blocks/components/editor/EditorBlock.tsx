import { GrabberIcon, XIcon } from '@primer/octicons-react'
import { Box, IconButton } from '@primer/react'

import type { DraggableProps } from './ElementDraggableEditor'

export function EditorBlock({
  attributes,
  children,
  isDragging,
  isDragOverlay,
  listeners,
  onDelete,
  setActivatorNodeRef,
  setNodeRef,
  style,
  title,
}: EditorBlockProps) {
  return (
    <Box ref={setNodeRef} style={style} sx={{ opacity: isDragging ? 0.5 : 1 }}>
      <Box
        sx={{
          alignItems: 'center',
          bg: 'canvas.subtle',
          border: 1,
          borderColor: 'border.default',
          borderStyle: 'solid',
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          display: 'flex',
          fontSize: 1,
          fontWeight: 600,
          gap: 2,
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Box flex={1}>{title}</Box>
        {isDragOverlay || listeners ? (
          <IconButton
            aria-label="Reorder element"
            icon={GrabberIcon}
            ref={setActivatorNodeRef}
            sx={{
              border: 0,
              boxShadow: 'none',
              cursor: 'grab',
              height: 22,
              width: 60,
              ':hover,:focus': {
                bg: 'unset',
              },
              '> svg': {
                height: 22,
                transform: 'rotate(90deg)',
                width: 22,
              },
            }}
            {...attributes}
            {...listeners}
          />
        ) : null}
        {onDelete ? (
          <Box display="flex" flex={1} justifyContent="flex-end">
            <IconButton
              aria-label="Delete element"
              disabled={isDragOverlay}
              icon={XIcon}
              onClick={onDelete}
              variant="danger"
              sx={{ height: 22, width: 22 }}
            />
          </Box>
        ) : null}
      </Box>
      <Box
        sx={{
          bg: 'canvas.default',
          border: 1,
          borderColor: 'border.default',
          borderRadius: 2,
          borderStyle: 'solid',
          borderTop: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflow: 'hidden',
          p: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export interface EditorBlockProps extends DraggableProps {
  children: React.ReactNode
  onDelete?: () => void
  title: string
}
