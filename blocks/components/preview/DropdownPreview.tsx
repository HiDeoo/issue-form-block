import { ActionList, ActionMenu } from '@primer/react'
import { Fragment } from 'react'

import { useElement } from '../../hooks/useElement'
import type { DropdownElement } from '../../libs/elements'

import { PreviewBlock } from './PreviewBlock'

export function DropdownPreview({ _id }: DropdownPreviewProps) {
  const dropdown = useElement(_id, 'dropdown')

  return (
    <PreviewBlock
      description={dropdown.attributes.description}
      id={dropdown._id}
      required={dropdown.validations?.required}
      title={dropdown.attributes.label}
    >
      <ActionMenu>
        <ActionMenu.Button>Selections:</ActionMenu.Button>
        <ActionMenu.Overlay>
          <ActionList aria-labelledby={`${dropdown._id}-caption`}>
            {dropdown.attributes.options.map((option, index) => (
              <Fragment key={option._id}>
                <ActionList.Item>{option.label}</ActionList.Item>
                {index < dropdown.attributes.options.length - 1 && <ActionList.Divider />}
              </Fragment>
            ))}
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
    </PreviewBlock>
  )
}

interface DropdownPreviewProps {
  _id: DropdownElement['_id']
}
