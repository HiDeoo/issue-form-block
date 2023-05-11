import { Textarea } from '@primer/react'

import { useElement } from '../../hooks/useElement'
import type { TextareaElement } from '../../libs/elements'

import { PreviewBlock } from './PreviewBlock'

export function TextareaPreview({ _id }: TextareaPreviewProps) {
  const textarea = useElement(_id, 'textarea')

  return (
    <PreviewBlock
      description={textarea.attributes.description}
      id={textarea._id}
      required={textarea.validations?.required}
      title={textarea.attributes.label}
    >
      <Textarea
        aria-describedby={`${textarea._id}-caption`}
        block
        id={textarea._id}
        placeholder={textarea.attributes.placeholder}
        readOnly
        resize="vertical"
        sx={{ bg: 'canvas.inset' }}
        value={textarea.attributes.value}
      />
    </PreviewBlock>
  )
}

interface TextareaPreviewProps {
  _id: TextareaElement['_id']
}
