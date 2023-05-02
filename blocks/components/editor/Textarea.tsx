import { FormControl, Textarea as PrimerTextarea } from '@primer/react'

const textareaStyle = { bg: 'canvas.inset' }

export function Textarea({ caption, errorMessage, label, onChange, required = false, value }: TextareaProps) {
  const isInvalid = errorMessage !== undefined && errorMessage !== false

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value)
  }

  return (
    <FormControl required={required}>
      <FormControl.Label>{label}</FormControl.Label>
      <PrimerTextarea
        aria-label={label}
        block
        onChange={handleChange}
        resize="vertical"
        rows={2}
        sx={textareaStyle}
        validationStatus={isInvalid ? 'error' : undefined}
        value={value}
      />
      {isInvalid ? <FormControl.Validation variant="error">{errorMessage}</FormControl.Validation> : null}
      {caption ? <FormControl.Caption>{caption}</FormControl.Caption> : null}
    </FormControl>
  )
}

interface TextareaProps {
  caption?: React.ReactNode
  errorMessage?: string | false
  label: string
  onChange: (newValue: string) => void
  required?: boolean
  value?: string
}
