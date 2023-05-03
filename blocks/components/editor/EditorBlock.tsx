import { GrabberIcon, XIcon } from '@primer/octicons-react'
import { Box, IconButton, Tooltip } from '@primer/react'

import type { DraggableProps } from '../../libs/dnd'

const dragHandleStyle = {
  border: 0,
  boxShadow: 'none',
  cursor: 'grab',
  display: 'block',
  height: 22,
  touchAction: 'none',
  width: 60,
  ':hover,:focus': {
    bg: 'unset',
  },
  '> svg': {
    height: 22,
    transform: 'rotate(90deg)',
    width: 22,
  },
}

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
  const dragHandle = (
    <IconButton
      aria-label="Reorder element"
      icon={GrabberIcon}
      ref={setActivatorNodeRef}
      sx={dragHandleStyle}
      {...attributes}
      {...listeners}
    />
  )

  const isDragged = isDragOverlay ?? isDragging
  const isDragHandlevisible = isDragOverlay ?? listeners

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        borderRadius: 2,
        opacity: isDragging ? 0.5 : 1,
        outlineColor: isDragging ? 'accent.fg' : undefined,
        outlineOffset: isDragging ? 1 : undefined,
        outlineStyle: isDragging ? 'dashed' : undefined,
        outlineWidth: isDragging ? 3 : undefined,
      }}
    >
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
        {isDragHandlevisible ? (
          isDragged ? (
            dragHandle
          ) : (
            <Tooltip aria-label="Reorder element" direction="n">
              {dragHandle}
            </Tooltip>
          )
        ) : null}
        {onDelete ? (
          <Box display="flex" flex={1} justifyContent="flex-end">
            <Tooltip aria-label="Delete element" direction="w">
              <IconButton
                aria-label="Delete element"
                disabled={isDragOverlay}
                icon={XIcon}
                onClick={onDelete}
                variant="danger"
                sx={{ display: 'block', height: 22, width: 22 }}
              />
            </Tooltip>
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
