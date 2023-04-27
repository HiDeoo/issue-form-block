import { useAtom } from 'jotai'

import type { TextareaElementAtom } from '../../atoms/issueForm'
import { Block } from '../Block'
import { TextInput } from '../TextInput'

export function TextareaEditor({ atom }: TextareaEditorProps) {
  const [textarea, setTextarea] = useAtom(atom)

  function handleLabelChange(name: string) {
    setTextarea((prevTextarea) => ({ ...prevTextarea, attributes: { ...prevTextarea.attributes, label: name } }))
  }

  return (
    <Block title="Textarea">
      <TextInput
        caption="A brief description of the expected user input."
        errorMessage={textarea.attributes.label.length === 0 && 'A label is required.'}
        label="Label"
        onChange={handleLabelChange}
        placeholder="Reproduction steps"
        required
        value={textarea.attributes.label}
      />
    </Block>
  )
}

interface TextareaEditorProps {
  atom: TextareaElementAtom
}
