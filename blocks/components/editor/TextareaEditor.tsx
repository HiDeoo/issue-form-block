import { useAtom, useSetAtom } from 'jotai'

import { issueFormElementsAtom, type TextareaElementAtom } from '../../atoms/issueForm'
import { TextInput } from '../TextInput'

import { EditorBlock } from './EditorBlock'
import type { DraggableProps } from './ElementDraggableEditor'

export function TextareaEditor({ atom, ...others }: TextareaEditorProps) {
  const [textarea, setTextarea] = useAtom(atom)
  const setElements = useSetAtom(issueFormElementsAtom)

  function handleLabelChange(name: string) {
    setTextarea((prevTextarea) => ({ ...prevTextarea, attributes: { ...prevTextarea.attributes, label: name } }))
  }

  function handleDeleteClick() {
    setElements((elements) => elements.filter((element) => element !== atom))
  }

  return (
    <EditorBlock onDelete={handleDeleteClick} title="Textarea" {...others}>
      <TextInput
        caption="A brief description of the expected user input."
        errorMessage={textarea.attributes.label.length === 0 && 'A label is required.'}
        label="Label"
        onChange={handleLabelChange}
        placeholder="Reproduction steps"
        required
        value={textarea.attributes.label}
      />
    </EditorBlock>
  )
}

interface TextareaEditorProps extends DraggableProps {
  atom: TextareaElementAtom
}
