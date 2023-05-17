import { Checkbox, CheckboxGroup, FormControl } from '@primer/react'

import { useElement } from '../../hooks/useElement'
import type { CheckboxesElement } from '../../libs/elements'

import { Markdown } from './Markdown'
import { PreviewBlock } from './PreviewBlock'

const formControlStyle = {
  '& label span span': {
    color: 'danger.fg',
  },
}

const checkboxStyle = {
  bg: 'canvas.inset',
  borderColor: 'border.default',
}

export function CheckboxesPreview({ _id }: CheckboxesPreviewProps) {
  const checkboxes = useElement(_id, 'checkboxes')

  return (
    <PreviewBlock
      description={checkboxes.attributes.description}
      id={checkboxes._id}
      title={checkboxes.attributes.label}
    >
      <CheckboxGroup aria-labelledby={`${checkboxes._id}-caption`}>
        {checkboxes.attributes.options.map((option) => (
          <FormControl key={option._id} required={option.required} sx={formControlStyle}>
            <Checkbox checked={false} readOnly sx={checkboxStyle} />
            <FormControl.Label>
              <Markdown>{option.label}</Markdown>
            </FormControl.Label>
          </FormControl>
        ))}
      </CheckboxGroup>
    </PreviewBlock>
  )
}

interface CheckboxesPreviewProps {
  _id: CheckboxesElement['_id']
}
