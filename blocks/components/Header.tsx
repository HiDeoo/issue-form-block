import { PlusIcon } from '@primer/octicons-react'
import { ActionList, ActionMenu, Box } from '@primer/react'
import { useSetAtom } from 'jotai'

import { createTextareaAtom, issueFormElementsAtom, type ElementAtom } from '../atoms/issueForm'
import type { IssueFormElementType } from '../libs/issueForm'

const elementAtomCreatorMap: Record<IssueFormElementType, () => ElementAtom> = {
  // TODO(HiDeoo)
  checkboxes: createTextareaAtom,
  // TODO(HiDeoo)
  dropdown: createTextareaAtom,
  // TODO(HiDeoo)
  input: createTextareaAtom,
  // TODO(HiDeoo)
  markdown: createTextareaAtom,
  textarea: createTextareaAtom,
}

export function Header() {
  const setElements = useSetAtom(issueFormElementsAtom)

  function createNewElementHandler(type: IssueFormElementType) {
    return function handleNewElement() {
      setElements((elements) => [...elements, elementAtomCreatorMap[type]()])
    }
  }

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
            <ActionList.Item onSelect={createNewElementHandler('checkboxes')}>Checkboxes</ActionList.Item>
            <ActionList.Item onSelect={createNewElementHandler('dropdown')}>Dropdown</ActionList.Item>
            <ActionList.Item onSelect={createNewElementHandler('input')}>Input</ActionList.Item>
            <ActionList.Item onSelect={createNewElementHandler('markdown')}>Markdown</ActionList.Item>
            <ActionList.Item onSelect={createNewElementHandler('textarea')}>Textarea</ActionList.Item>
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
    </Box>
  )
}
