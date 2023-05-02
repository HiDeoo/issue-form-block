import { useAtomValue } from 'jotai'

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
      <div># // TODO </div>
    </PreviewBlock>
  )
}

interface DropdownPreviewProps {
  atom: DropdownElementAtom
}
