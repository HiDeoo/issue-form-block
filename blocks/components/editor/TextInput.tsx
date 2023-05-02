import { FormControl, TextInput as PrimerTextInput } from '@primer/react'

const textInputStyle = { bg: 'canvas.inset' }

export function TextInput({ caption, errorMessage, label, onChange, required = false, value }: TextInputProps) {
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
        sx={textInputStyle}
        validationStatus={isInvalid ? 'error' : undefined}
        value={value}
      />
      {isInvalid ? <FormControl.Validation variant="error">{errorMessage}</FormControl.Validation> : null}
      {caption ? <FormControl.Caption>{caption}</FormControl.Caption> : null}
    </FormControl>
  )
}

interface TextInputProps {
  caption?: React.ReactNode
  errorMessage?: string | false
  label: string
  onChange: (newValue: string) => void
  required?: boolean
  value?: string
}
