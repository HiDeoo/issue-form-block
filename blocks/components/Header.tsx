import { FoldIcon, PlusIcon, UnfoldIcon } from '@primer/octicons-react'
import { ActionList, ActionMenu, Box, IconButton, Tooltip } from '@primer/react'
import { useSetAtom } from 'jotai'

import {
  createTextareaAtom,
  issueFormElementsAtom,
  type ElementAtom,
  setCollapsedIssueFormElementsAtom,
} from '../atoms/issueForm'
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

const collapseButtonTooltip = 'Collapse all elements'
const expandButtonTooltip = 'Expand all elements'

export function Header() {
  const setElements = useSetAtom(issueFormElementsAtom)
  const setCollapsedIssueFormElements = useSetAtom(setCollapsedIssueFormElementsAtom)

  function createNewElementHandler(type: IssueFormElementType) {
    return function handleNewElement() {
      setElements((elements) => [...elements, elementAtomCreatorMap[type]()])
    }
  }

  function handleCollapseClick() {
    setCollapsedIssueFormElements(true)
  }

  function handleExpandClick() {
    setCollapsedIssueFormElements(false)
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
      <Box flex={1} />
      <Tooltip aria-label={collapseButtonTooltip} direction="w">
        <IconButton aria-label={collapseButtonTooltip} icon={FoldIcon} onClick={handleCollapseClick} />
      </Tooltip>
      <Tooltip aria-label={expandButtonTooltip} direction="w">
        <IconButton aria-label={expandButtonTooltip} icon={UnfoldIcon} onClick={handleExpandClick} />
      </Tooltip>
    </Box>
  )
}
