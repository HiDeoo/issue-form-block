import { PlusIcon } from '@primer/octicons-react'
import { ActionList, ActionMenu, Box } from '@primer/react'

export function Header() {
  return (
    <Box
      sx={{
        alignItems: 'center',
        bg: 'canvas.subtle',
        borderBottomColor: 'border.default',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        display: 'flex',
        gap: 2,
        p: 2,
      }}
    >
      <ActionMenu>
        <ActionMenu.Button leadingIcon={PlusIcon}>New element</ActionMenu.Button>
        <ActionMenu.Overlay>
          <ActionList>
            <ActionList.Item>Checkboxes</ActionList.Item>
            <ActionList.Item>Dropdown</ActionList.Item>
            <ActionList.Item>Input</ActionList.Item>
            <ActionList.Item>Markdown</ActionList.Item>
            <ActionList.Item>Textarea</ActionList.Item>
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
    </Box>
  )
}
