import { ELEMENT_ID_VALIDATION_REGEX } from '../../libs/elements'

import { TextInput } from './TextInput'

export function IdInput({ onChange, value }: IdInputProps) {
  const isInvalid = !value || value.length === 0 ? false : !ELEMENT_ID_VALIDATION_REGEX.test(value)

  return (
    <TextInput
      caption="Unique in the form definition and can only use alpha-numeric characters, -, and _."
      errorMessage={isInvalid && 'Only alpha-numeric characters, -, and _.'}
      label="Identifier"
      onChange={onChange}
      value={value}
    />
  )
}

interface IdInputProps {
  onChange: (newValue: string) => void
  value?: string
}
