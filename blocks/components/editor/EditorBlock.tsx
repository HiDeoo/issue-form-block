import { FoldIcon, GrabberIcon, UnfoldIcon, XIcon } from '@primer/octicons-react'
import { Box, IconButton, Text, Tooltip } from '@primer/react'

import { useElementsActions } from '../../hooks/useElementsActions'
import type { DraggableProps } from '../../libs/dnd'
import type { IssueFormElement } from '../../libs/elements'

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

const iconButtonStyle = {
  display: 'block',
  height: 22,
  width: 22,
}

export function EditorBlock({
  attributes,
  children,
  collapsed,
  excerpt,
  _id,
  isDragging,
  isDragOverlay,
  listeners,
  setActivatorNodeRef,
  setNodeRef,
  style,
  title,
}: EditorBlockProps) {
  const { deleteElement, toggleCollapseElement } = useElementsActions()

  function handleToggleCollapsedClick() {
    if (!_id) {
      return
    }

    toggleCollapseElement(_id)
  }

  function handleDeleteClick() {
    if (!_id) {
      return
    }

    deleteElement(_id)
  }

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

  const isElementBlock = _id !== undefined
  const isDragged = isDragOverlay ?? isDragging
  const isDragHandlevisible = isDragOverlay ?? listeners

  const expandCollapseButtonTooltip = `${collapsed ? 'Expand' : 'Collapse'} element`

  return (
    <Box
      id={_id ? `editor-block-${_id}` : undefined}
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
          bg: 'canvas.subtle',
          border: 1,
          borderColor: 'border.default',
          borderStyle: 'solid',
          borderBottomLeftRadius: collapsed ? 2 : 0,
          borderBottomRightRadius: collapsed ? 2 : 0,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          display: 'grid',
          fontSize: 1,
          fontWeight: 600,
          gridTemplateColumns: 'minmax(0, 1fr) 4rem minmax(0, 1fr)',
          p: 2,
        }}
      >
        <Box alignItems="center" display="flex">
          {title}
          {collapsed && excerpt ? (
            <Text
              sx={{
                fontSize: 0,
                fontWeight: 400,
                ml: '0.4em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {excerpt}
            </Text>
          ) : null}
        </Box>
        <Box display="flex">
          {isDragHandlevisible ? (
            isDragged ? (
              dragHandle
            ) : (
              <Tooltip aria-label="Reorder element" direction="n">
                {dragHandle}
              </Tooltip>
            )
          ) : null}
        </Box>
        {isElementBlock ? (
          <Box sx={{ display: 'flex', flex: 1, gap: 1, justifyContent: 'flex-end' }}>
            <>
              <Tooltip aria-label={expandCollapseButtonTooltip} direction="w">
                <IconButton
                  aria-label={expandCollapseButtonTooltip}
                  disabled={isDragOverlay}
                  icon={collapsed ? UnfoldIcon : FoldIcon}
                  onClick={handleToggleCollapsedClick}
                  sx={iconButtonStyle}
                />
              </Tooltip>
              <Tooltip aria-label="Delete element" direction="w">
                <IconButton
                  aria-label="Delete element"
                  disabled={isDragOverlay}
                  icon={XIcon}
                  onClick={handleDeleteClick}
                  variant="danger"
                  sx={iconButtonStyle}
                />
              </Tooltip>
            </>
          </Box>
        ) : null}
      </Box>
      {collapsed ? null : (
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
      )}
    </Box>
  )
}

export interface EditorBlockProps extends DraggableProps {
  _id?: IssueFormElement['_id']
  children: React.ReactNode
  collapsed?: boolean
  excerpt?: string
  title: string
}
