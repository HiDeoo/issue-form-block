import { ActionList, ActionMenu } from '@primer/react'
import { useAtomValue } from 'jotai'
import { Fragment } from 'react'

import type { DropdownElementAtom } from '../../atoms/issueForm'

import { PreviewBlock } from './PreviewBlock'

export function DropdownPreview({ atom }: DropdownPreviewProps) {
  const dropdown = useAtomValue(atom)
  const dropdownId = atom.toString()

  return (
    <PreviewBlock
      description={dropdown.attributes.description}
      id={dropdownId}
      required={dropdown.validations?.required}
      title={dropdown.attributes.label}
    >
      <ActionMenu>
        <ActionMenu.Button>Selections:</ActionMenu.Button>
        <ActionMenu.Overlay>
          <ActionList aria-labelledby={`${dropdownId}-caption`}>
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
  atom: DropdownElementAtom
}
