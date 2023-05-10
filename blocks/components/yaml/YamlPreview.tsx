import { Box } from '@primer/react'
import hljs from 'highlight.js/lib/core'
import yaml from 'highlight.js/lib/languages/yaml'
import 'highlight.js/styles/github.css'
import { useMemo } from 'react'

import { useIssueForm } from '../../hooks/useIssueForm'
import { serializeIssueForm } from '../../libs/issueForm'

hljs.registerLanguage('yaml', yaml)

export function YamlPreview() {
  const issueForm = useIssueForm()

  const issueFormYaml = useMemo(() => {
    const yaml = serializeIssueForm(issueForm.metadata, issueForm.elements)

    return hljs.highlight(yaml, { language: 'yaml' })
  }, [issueForm])

  return (
    <Box
      dangerouslySetInnerHTML={{ __html: issueFormYaml.value }}
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
  )
}
