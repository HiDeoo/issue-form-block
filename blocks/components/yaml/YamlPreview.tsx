import { Box } from '@primer/react'
import hljs from 'highlight.js/lib/core'
import yaml from 'highlight.js/lib/languages/yaml'
import 'highlight.js/styles/github.css'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

import { issueFormAtom } from '../../atoms/issueForm'
import { serializeIssueForm } from '../../libs/issueForm'

hljs.registerLanguage('yaml', yaml)

// TODO(HiDeoo) Handle errors
export function YamlPreview() {
  const issueForm = useAtomValue(issueFormAtom)
  const issueFormYaml = useMemo(() => {
    const yaml = serializeIssueForm(issueForm.metadata, issueForm.elements)
    return hljs.highlight(yaml, { language: 'yaml' })
  }, [issueForm])

  return (
    <Box
      dangerouslySetInnerHTML={{ __html: issueFormYaml.value }}
      overflow="auto"
      sx={{
        bg: 'canvas.inset',
        border: 1,
        borderColor: 'border.default',
        borderRadius: 2,
        borderStyle: 'solid',
        fontFamily: 'mono',
        fontSize: 1,
        maxHeight: '70vh',
        p: 2,
        whiteSpace: 'pre',
      }}
    />
  )
}
