import { Flash, StyledOcticon } from '@primer/react'

const flashStyle = {
  fontSize: 1,
  fontWeight: 500,
  p: 2,
  '> code': {
    fontFamily: 'mono',
  },
}

export function HeaderFlash({ children, icon }: HeaderFlashProps) {
  return (
    <Flash sx={flashStyle} variant="warning">
      <StyledOcticon icon={icon} />
      {children}
    </Flash>
  )
}

interface HeaderFlashProps {
  children: React.ReactNode
  icon: React.ElementType
}
