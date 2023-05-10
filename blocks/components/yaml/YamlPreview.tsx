import { AlertIcon } from '@primer/octicons-react'
import { Box, Flash, StyledOcticon } from '@primer/react'
import hljs from 'highlight.js/lib/core'
import yaml from 'highlight.js/lib/languages/yaml'
import 'highlight.js/styles/github.css'
import { useMemo } from 'react'

import { useIssueForm } from '../../hooks/useIssueForm'
import { serializeIssueForm } from '../../libs/issueForm'

hljs.registerLanguage('yaml', yaml)

export function YamlPreview() {
  const issueForm = useIssueForm()

  const { isValid, yaml } = useMemo(() => {
    const { isValid, yaml } = serializeIssueForm(issueForm.metadata, issueForm.elements, true)

    return { isValid, yaml: hljs.highlight(yaml, { language: 'yaml' }).value }
  }, [issueForm])

  return (
    <>
      {isValid ? null : (
        <Flash variant="danger" sx={{ fontSize: 1, fontWeight: 500, p: 2 }}>
          <StyledOcticon icon={AlertIcon} />
          The issue form contains errors.
        </Flash>
      )}
      <Box
        dangerouslySetInnerHTML={{ __html: yaml }}
        sx={{
          bg: 'canvas.inset',
          border: 1,
          borderColor: 'border.default',
          borderRadius: 2,
          borderStyle: 'solid',
          fontFamily: 'mono',
          fontSize: 1,
          height: '100%',
          overflow: 'auto',
          p: 2,
          whiteSpace: 'pre',
        }}
      />
    </>
  )
}
