import { Checkbox, CheckboxGroup, FormControl } from '@primer/react'
import { useAtomValue } from 'jotai'

import type { CheckboxesElementAtom } from '../../atoms/issueForm'

import { PreviewBlock } from './PreviewBlock'

const checkboxStyle = {
  bg: 'canvas.inset',
  borderColor: 'border.default',
}

// TODO(HiDeoo) markdown label
export function CheckboxesPreview({ atom }: CheckboxesPreviewProps) {
  const checkboxes = useAtomValue(atom)
  const checkboxesId = atom.toString()

  return (
    <PreviewBlock
      description={checkboxes.attributes.description}
      id={checkboxesId}
      required={checkboxes.validations?.required}
      title={checkboxes.attributes.label}
    >
      <CheckboxGroup>
        {checkboxes.attributes.options.map((option) => (
          <FormControl key={option.id}>
            <Checkbox checked={false} readOnly sx={checkboxStyle} />
            <FormControl.Label sx={{ fontWeight: 400 }}>{option.label}</FormControl.Label>
          </FormControl>
        ))}
      </CheckboxGroup>
    </PreviewBlock>
  )
}

interface CheckboxesPreviewProps {
  atom: CheckboxesElementAtom
}
