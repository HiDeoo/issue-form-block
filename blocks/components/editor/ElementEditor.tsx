import type { DraggableProps } from '../../libs/dnd'

import { CheckboxesEditor } from './CheckboxesEditor'
import { DropdownEditor } from './DropdownEditor'
import type { ElementDraggableEditorProps } from './ElementDraggableEditor'
import { InputEditor } from './InputEditor'
import { MarkdownEditor } from './MarkdownEditor'
import { TextareaEditor } from './TextareaEditor'

export function ElementEditor({ _id, type, ...others }: ElementEditorProps) {
  switch (type) {
    case 'checkboxes': {
      return <CheckboxesEditor _id={_id} {...others} />
    }
    case 'dropdown': {
      return <DropdownEditor _id={_id} {...others} />
    }
    case 'input': {
      return <InputEditor _id={_id} {...others} />
    }
    case 'markdown': {
      return <MarkdownEditor _id={_id} {...others} />
    }
    case 'textarea': {
      return <TextareaEditor _id={_id} {...others} />
    }
  }
}

type ElementEditorProps = ElementDraggableEditorProps & DraggableProps
