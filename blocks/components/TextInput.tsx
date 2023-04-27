import { FormControl, TextInput as PrimerTextInput } from '@primer/react'

const textInputStyles = { bg: 'canvas.inset' }

export function TextInput({
  caption,
  errorMessage,
  label,
  onChange,
  placeholder,
  required = false,
  value,
}: TextInputProps) {
  const isInvalid = errorMessage !== undefined && errorMessage !== false

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value)
  }

  return (
    <FormControl required={required}>
      <FormControl.Label>{label}</FormControl.Label>
      <PrimerTextInput
        aria-label={label}
        block
        onChange={handleChange}
        placeholder={placeholder}
        sx={textInputStyles}
        validationStatus={isInvalid ? 'error' : undefined}
        value={value}
      />
      {isInvalid ? <FormControl.Validation variant="error">{errorMessage}</FormControl.Validation> : null}
      {caption ? <FormControl.Caption>{caption}</FormControl.Caption> : null}
    </FormControl>
  )
}

interface TextInputProps {
  caption?: string
  errorMessage?: string | false
  label: string
  onChange: (newValue: string) => void
  placeholder: string
  required?: boolean
  value: string
}
