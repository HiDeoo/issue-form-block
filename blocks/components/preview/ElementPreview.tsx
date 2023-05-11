import type { IssueFormElement } from '../../libs/elements'

import { CheckboxesPreview } from './CheckboxesPreview'
import { DropdownPreview } from './DropdownPreview'
import { InputPreview } from './InputPreview'
import { MarkdownPreview } from './MarkdownPreview'
import { TextareaPreview } from './TextareaPreview'

export function ElementPreview({ _id, type }: ElementEditorProps) {
  switch (type) {
    case 'checkboxes': {
      return <CheckboxesPreview _id={_id} />
    }
    case 'dropdown': {
      return <DropdownPreview _id={_id} />
    }
    case 'input': {
      return <InputPreview _id={_id} />
    }
    case 'markdown': {
      return <MarkdownPreview _id={_id} />
    }
    case 'textarea': {
      return <TextareaPreview _id={_id} />
    }
  }
}

interface ElementEditorProps {
  _id: IssueFormElement['_id']
  type: IssueFormElement['type']
}
