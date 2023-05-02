import { Textarea } from '@primer/react'
import { useAtomValue } from 'jotai'

import type { TextareaElementAtom } from '../../atoms/issueForm'

import { PreviewBlock } from './PreviewBlock'

export function TextareaPreview({ atom }: TextareaPreviewProps) {
  const textarea = useAtomValue(atom)
  const textareaId = atom.toString()

  return (
    <PreviewBlock
      description={textarea.attributes.description}
      id={textareaId}
      required={textarea.validations?.required}
      title={textarea.attributes.label}
    >
      <Textarea
        aria-describedby={`${textareaId}-caption`}
        id={textareaId}
        placeholder={textarea.attributes.placeholder}
        readOnly
        resize="vertical"
        sx={{ bg: 'canvas.inset', width: '100%' }}
        value={textarea.attributes.value}
      />
    </PreviewBlock>
  )
}

interface TextareaPreviewProps {
  atom: TextareaElementAtom
}
