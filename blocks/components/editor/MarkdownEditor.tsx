import { Box, Text } from '@primer/react'
import { MarkdownEditor as PrimerMarkdownEditor } from '@primer/react/drafts'
import { useAtom, useSetAtom } from 'jotai'

import { issueFormElementsAtom, type MarkdownElementAtom } from '../../atoms/issueForm'

import { EditorBlock } from './EditorBlock'
import type { DraggableProps } from './ElementDraggableEditor'

const markdownStyle = {
  '>fieldset': {
    p: 0,
  },
  '>fieldset>div>div>span': {
    bg: 'canvas.inset',
    border: 1,
    borderColor: 'border.default',
    borderStyle: 'solid',
  },
  '>fieldset>div>header>div>button:first-child': {
    display: 'none',
  },
}

export function MarkdownEditor({ atom, ...others }: MarkdownEditorProps) {
  const [markdown, setMarkdown] = useAtom(atom)
  const setElements = useSetAtom(issueFormElementsAtom)

  function handleValueChange(value: string) {
    setMarkdown((prevMarkdown) => ({ ...prevMarkdown, attributes: { ...prevMarkdown.attributes, value } }))
  }

  function handleDeleteClick() {
    setElements((elements) => elements.filter((element) => element !== atom))
  }

  return (
    <EditorBlock onDelete={handleDeleteClick} title="Markdown" {...others}>
      <Box sx={markdownStyle}>
        <PrimerMarkdownEditor
          minHeightLines={3}
          onChange={handleValueChange}
          onRenderPreview={() => Promise.resolve('')}
          required
          value={markdown.attributes.value}
          viewMode="edit"
        >
          <PrimerMarkdownEditor.Label>Value</PrimerMarkdownEditor.Label>
        </PrimerMarkdownEditor>
        <Text color="fg.muted" fontSize={0}>
          The Markdown text that is rendered.
        </Text>
      </Box>
    </EditorBlock>
  )
}

interface MarkdownEditorProps extends DraggableProps {
  atom: MarkdownElementAtom
}
