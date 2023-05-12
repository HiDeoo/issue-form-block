import { useErrors } from '../hooks/useErrors'

import { IssueFormError } from './IssueFormError'
import { Report } from './Report'

const errorMessageStyle = {
  px: 1,
}

export function IssueFormErrors() {
  const errors = useErrors()

  return (
    <Report
      messages={errors.map((error, index) => (
        <IssueFormError error={error} key={index} sx={errorMessageStyle} />
      ))}
      variant="error"
    />
  )
}
