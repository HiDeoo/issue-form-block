import { Box, Text } from '@primer/react'
import { MarkdownEditor as PrimerMarkdownEditor } from '@primer/react/drafts'
import { useAtom } from 'jotai'

import type { MarkdownElementAtom } from '../../atoms/issueForm'
import type { DraggableProps } from '../../libs/dnd'

import { EditorBlock } from './EditorBlock'

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

  function handleValueChange(value: string) {
    setMarkdown((prevMarkdown) => ({ ...prevMarkdown, attributes: { ...prevMarkdown.attributes, value } }))
  }

  return (
    <EditorBlock
      atom={atom}
      collapsed={markdown._collapsed}
      excerpt={markdown.attributes.value}
      title="Markdown"
      {...others}
    >
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
