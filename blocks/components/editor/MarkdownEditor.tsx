import { Box, Text } from '@primer/react'
import { MarkdownEditor as PrimerMarkdownEditor } from '@primer/react/drafts'

import { useElement } from '../../hooks/useElement'
import { useElementsActions } from '../../hooks/useElementsActions'
import type { DraggableProps } from '../../libs/dnd'
import type { MarkdownElement } from '../../libs/elements'

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

export function MarkdownEditor({ _id, ...others }: MarkdownEditorProps) {
  const markdown = useElement(_id, 'markdown')
  const { setElement } = useElementsActions()

  function handleValueChange(value: string) {
    setElement({ ...markdown, attributes: { ...markdown.attributes, value } })
  }

  return (
    <EditorBlock
      collapsed={markdown._collapsed}
      excerpt={markdown.attributes.value}
      _id={_id}
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
  _id: MarkdownElement['_id']
}
