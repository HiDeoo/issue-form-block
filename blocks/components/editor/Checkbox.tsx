import { FormControl, Checkbox as PrimerCheckbox } from '@primer/react'
import type { BetterSystemStyleObject } from '@primer/react/lib/sx'

const checkboxStyle = {
  bg: 'canvas.inset',
  borderColor: 'border.default',
  '&&::before': {
    animation: 'none',
  },
  '&&:checked::before': {
    clipPath: 'inset(0 0 0 0)',
  },
}

export function Checkbox({ caption, checked = false, label, onChange, required = false, sx }: CheckboxProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.checked)
  }

  return (
    <FormControl required={required} sx={sx}>
      <PrimerCheckbox aria-label={label} checked={checked} onChange={handleChange} sx={checkboxStyle} />
      <FormControl.Label>{label}</FormControl.Label>
      {caption ? <FormControl.Caption>{caption}</FormControl.Caption> : null}
    </FormControl>
  )
}

interface CheckboxProps {
  caption?: React.ReactNode
  checked?: boolean
  label: string
  onChange: (newValue: boolean) => void
  required?: boolean
  sx?: BetterSystemStyleObject
}
