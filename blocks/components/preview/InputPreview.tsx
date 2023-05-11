import { TextInput } from '@primer/react'

import { useElement } from '../../hooks/useElement'
import type { InputElement } from '../../libs/elements'

import { PreviewBlock } from './PreviewBlock'

export function InputPreview({ _id }: InputPreviewProps) {
  const input = useElement(_id, 'input')

  return (
    <PreviewBlock
      description={input.attributes.description}
      id={input._id}
      required={input.validations?.required}
      title={input.attributes.label}
    >
      <TextInput
        aria-describedby={`${input._id}-caption`}
        block
        id={input._id}
        placeholder={input.attributes.placeholder}
        readOnly
        sx={{ bg: 'canvas.inset' }}
        value={input.attributes.value}
      />
    </PreviewBlock>
  )
}

interface InputPreviewProps {
  _id: InputElement['_id']
}
