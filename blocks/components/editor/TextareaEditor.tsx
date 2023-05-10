import { Link } from '@primer/react'

import { useElement } from '../../hooks/useElement'
import { useElementsActions } from '../../hooks/useElementsActions'
import type { DraggableProps } from '../../libs/dnd'
import type { TextareaElement } from '../../libs/issueForm'

import { Checkbox } from './Checkbox'
import { EditorBlock } from './EditorBlock'
import { IdInput } from './IdInput'
import { Textarea } from './Textarea'
import { TextInput } from './TextInput'

export function TextareaEditor({ _id, ...others }: TextareaEditorProps) {
  const textarea = useElement(_id, 'textarea')
  const { setElement } = useElementsActions()

  function handleDescriptionChange(description: string) {
    setElement({ ...textarea, attributes: { ...textarea.attributes, description } })
  }

  function handleIdChange(id: string) {
    setElement({ ...textarea, id })
  }

  function handleLabelChange(label: string) {
    setElement({ ...textarea, attributes: { ...textarea.attributes, label } })
  }

  function handlePlaceholderChange(placeholder: string) {
    setElement({ ...textarea, attributes: { ...textarea.attributes, placeholder } })
  }

  function handleRenderChange(render: string) {
    setElement({ ...textarea, attributes: { ...textarea.attributes, render } })
  }

  function handleRequiredChange(required: boolean) {
    setElement({ ...textarea, validations: { ...textarea.validations, required } })
  }

  function handleValueChange(value: string) {
    setElement({ ...textarea, attributes: { ...textarea.attributes, value } })
  }

  return (
    <EditorBlock
      collapsed={textarea._collapsed}
      excerpt={textarea.attributes.label}
      _id={_id}
      title="Textarea"
      {...others}
    >
      <TextInput
        caption="A brief description of the expected user input."
        errorMessage={textarea.attributes.label.length === 0 && 'A label is required.'}
        label="Label"
        onChange={handleLabelChange}
        required
        value={textarea.attributes.label}
      />
      <TextInput
        caption="A description of the textarea to provide context or guidance."
        label="Description"
        onChange={handleDescriptionChange}
        value={textarea.attributes.description}
      />
      <Textarea
        caption="A placeholder that renders in the textarea when empty."
        label="Placeholder"
        onChange={handlePlaceholderChange}
        value={textarea.attributes.placeholder}
      />
      <Textarea
        caption="Text pre-filled in the textarea."
        label="Value"
        onChange={handleValueChange}
        value={textarea.attributes.value}
      />
      <TextInput
        caption={
          <>
            If provided, the text will be formatted into a codeblock with{' '}
            <Link
              href="https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml"
              target="_blank"
            >
              the given language
            </Link>
            .
          </>
        }
        label="Render"
        onChange={handleRenderChange}
        value={textarea.attributes.render}
      />
      <IdInput onChange={handleIdChange} value={textarea.id} />
      <Checkbox
        caption="Prevents form submission for public repositories until the textarea is completed."
        checked={textarea.validations?.required}
        label="Required"
        onChange={handleRequiredChange}
      />
    </EditorBlock>
  )
}

interface TextareaEditorProps extends DraggableProps {
  _id: TextareaElement['_id']
}
