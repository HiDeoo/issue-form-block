import { TextInput } from '@primer/react'
import { useAtomValue } from 'jotai'

import type { InputElementAtom } from '../../atoms/issueForm'

import { PreviewBlock } from './PreviewBlock'

export function InputPreview({ atom }: InputPreviewProps) {
  const input = useAtomValue(atom)
  const inputId = atom.toString()

  return (
    <PreviewBlock
      description={input.attributes.description}
      id={inputId}
      required={input.validations?.required}
      title={input.attributes.label}
    >
      <TextInput
        aria-describedby={`${inputId}-caption`}
        block
        id={inputId}
        placeholder={input.attributes.placeholder}
        readOnly
        sx={{ bg: 'canvas.inset' }}
        value={input.attributes.value}
      />
    </PreviewBlock>
  )
}

interface InputPreviewProps {
  atom: InputElementAtom
}
