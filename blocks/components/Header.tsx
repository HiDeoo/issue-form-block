import type { FileBlockProps } from '@githubnext/blocks'
import { EyeIcon, FileDiffIcon, FoldIcon, PlusIcon, UnfoldIcon } from '@primer/octicons-react'
import { ActionList, ActionMenu, Box, IconButton, SegmentedControl, Tooltip } from '@primer/react'
import { useEffect, useRef } from 'react'

import { useElements } from '../hooks/useElements'
import { useElementsActions } from '../hooks/useElementsActions'
import { usePanels } from '../hooks/usePanels'
import { usePanelsActions } from '../hooks/usePanelsActions'
import {
  createCheckboxesElement,
  createDropdownElement,
  createInputElement,
  createMarkdownElement,
  createTextareaElement,
  type IssueFormElement,
  type IssueFormElementType,
} from '../libs/elements'

import { Errors } from './Errors'
import { Warnings } from './Warnings'
import { YamlDialog } from './yaml/YamlDialog'

const elementCreatorMap: Record<IssueFormElementType, () => IssueFormElement> = {
  checkboxes: createCheckboxesElement,
  dropdown: createDropdownElement,
  input: createInputElement,
  markdown: createMarkdownElement,
  textarea: createTextareaElement,
}

const collapseButtonTooltip = 'Collapse all elements'
const expandButtonTooltip = 'Expand all elements'

export function Header({ isEditable, isValidExtension, isValidPath }: HeaderProps) {
  const { isSinglePanel, selectedPanel } = usePanels()
  const { setSelectedPanel } = usePanelsActions()

  const elements = useElements()
  const { addElement, setElementsCollapsed } = useElementsActions()

  const editorBlockToFocus = useRef<{ id: string; type: IssueFormElementType } | undefined>(undefined)

  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      if (editorBlockToFocus.current === undefined) {
        return
      }

      const newEditBlockFirstInput = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        `#editor-block-${editorBlockToFocus.current.id} ${
          editorBlockToFocus.current.type === 'markdown' ? 'textarea' : 'input'
        }`
      )

      if (newEditBlockFirstInput) {
        newEditBlockFirstInput.focus()
        newEditBlockFirstInput.setSelectionRange(
          newEditBlockFirstInput.value.length,
          newEditBlockFirstInput.value.length
        )
      }

      editorBlockToFocus.current = undefined
    }, 150)

    return () => {
      clearTimeout(focusTimeout)
    }
  }, [elements.length])

  function createNewElementHandler(type: IssueFormElementType) {
    return function handleNewElement() {
      const newElement = elementCreatorMap[type]()
      editorBlockToFocus.current = { id: newElement._id, type }

      addElement(newElement)
    }
  }

  function handleCollapseClick() {
    setElementsCollapsed(true)
  }

  function handleExpandClick() {
    setElementsCollapsed(false)
  }

  function handleSelectedPanelChange(selectedIndex: number) {
    setSelectedPanel(selectedIndex === 0 ? 'editor' : 'preview')
  }

  const showPanelSelector = isSinglePanel
  const showExpandCollapseButtons = !showPanelSelector || selectedPanel === 'editor'

  return (
    <Box
      sx={{
        alignItems: 'center',
        bg: 'canvas.subtle',
        borderBottomColor: 'border.default',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        p: 2,
      }}
    >
      <ActionMenu>
        <ActionMenu.Button leadingIcon={PlusIcon} variant="primary">
          New element
        </ActionMenu.Button>
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
      <Warnings isEditable={isEditable} isValidExtension={isValidExtension} isValidPath={isValidPath} />
      <Errors />
      <Box flex={1} />
      {showExpandCollapseButtons ? (
        <>
          <Tooltip aria-label={collapseButtonTooltip} direction="w">
            <IconButton aria-label={collapseButtonTooltip} icon={FoldIcon} onClick={handleCollapseClick} />
          </Tooltip>
          <Tooltip aria-label={expandButtonTooltip} direction="w">
            <IconButton aria-label={expandButtonTooltip} icon={UnfoldIcon} onClick={handleExpandClick} />
          </Tooltip>
        </>
      ) : null}
      <YamlDialog />
      {showPanelSelector ? (
        <SegmentedControl
          aria-label={`Show ${selectedPanel === 'editor' ? 'preview' : 'editor'}`}
          onChange={handleSelectedPanelChange}
          variant={{ narrow: 'hideLabels', regular: 'default' }}
        >
          <SegmentedControl.IconButton aria-label="Editor" icon={FileDiffIcon} selected={selectedPanel === 'editor'} />
          <SegmentedControl.IconButton aria-label="Preview" icon={EyeIcon} selected={selectedPanel === 'preview'} />
        </SegmentedControl>
      ) : null}
    </Box>
  )
}

interface HeaderProps {
  isEditable: FileBlockProps['isEditable']
  isValidExtension: boolean
  isValidPath: boolean
}
