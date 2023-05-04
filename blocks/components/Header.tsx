import { EyeIcon, FileCodeIcon, FoldIcon, PlusIcon, UnfoldIcon } from '@primer/octicons-react'
import { ActionList, ActionMenu, Box, Button, FormControl, IconButton, SegmentedControl, Tooltip } from '@primer/react'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'

import {
  createTextareaAtom,
  issueFormElementsAtom,
  type ElementAtom,
  setCollapsedIssueFormElementsAtom,
  resetIssueFormAtom,
} from '../atoms/issueForm'
import { selectedPanelAtom } from '../atoms/ui'
import { usePanels } from '../hooks/usePanels'
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
  const { isSinglePanel } = usePanels()
  const [selectedPanel, setSelectedPanel] = useAtom(selectedPanelAtom)

  const [elements, setElements] = useAtom(issueFormElementsAtom)
  const setCollapsedIssueFormElements = useSetAtom(setCollapsedIssueFormElementsAtom)
  const resetIssueForm = useSetAtom(resetIssueFormAtom)

  const editorBlockIdToFocus = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (editorBlockIdToFocus.current === undefined) {
      return
    }

    const newEditBlockFirstInput = document.querySelector<HTMLInputElement>(
      `#editor-block-${editorBlockIdToFocus.current} input`
    )

    if (newEditBlockFirstInput) {
      newEditBlockFirstInput.focus()
    }

    editorBlockIdToFocus.current = undefined
  }, [elements.length])

  function createNewElementHandler(type: IssueFormElementType) {
    return function handleNewElement() {
      const newElement = elementAtomCreatorMap[type]()
      const newElementId = newElement.toString()

      editorBlockIdToFocus.current = newElementId

      setElements((elements) => [...elements, newElement])
    }
  }

  function handleCollapseClick() {
    setCollapsedIssueFormElements(true)
  }

  function handleExpandClick() {
    setCollapsedIssueFormElements(false)
  }

  function handleResetClick() {
    resetIssueForm()
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
      <Button onClick={handleResetClick} variant="danger">
        Reset
      </Button>
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
      {showPanelSelector ? (
        <FormControl>
          <SegmentedControl
            aria-label={`Show ${selectedPanel === 'editor' ? 'preview' : 'editor'}`}
            onChange={handleSelectedPanelChange}
            variant={{ narrow: 'hideLabels', regular: 'default' }}
          >
            <SegmentedControl.IconButton
              aria-label="Editor"
              icon={FileCodeIcon}
              selected={selectedPanel === 'editor'}
              value="orioyut"
            />
            <SegmentedControl.IconButton aria-label="Preview" icon={EyeIcon} selected={selectedPanel === 'preview'} />
          </SegmentedControl>
        </FormControl>
      ) : null}
    </Box>
  )
}
