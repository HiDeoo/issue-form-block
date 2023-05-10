import { Checkbox, CheckboxGroup, FormControl } from '@primer/react'

import { useElement } from '../../hooks/useElement'
import type { CheckboxesElement } from '../../libs/issueForm'

import { Markdown } from './Markdown'
import { PreviewBlock } from './PreviewBlock'

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
      required={checkboxes.validations?.required}
      title={checkboxes.attributes.label}
    >
      <CheckboxGroup aria-labelledby={`${checkboxes._id}-caption`}>
        {checkboxes.attributes.options.map((option) => (
          <FormControl key={option._id}>
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
