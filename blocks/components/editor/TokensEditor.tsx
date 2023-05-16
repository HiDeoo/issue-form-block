import { FormControl, TextInputWithTokens, Token as PrimerToken, type TokenProps } from '@primer/react'
import { useMemo, useState } from 'react'

const textInputStyle = { bg: 'canvas.inset' }
const tokenStyle = { bg: 'canvas.default' }

export function TokensEditor({ caption, label, onAdd, onDelete, tokens }: TokensEditorProps) {
  const [value, setValue] = useState('')

  const tokensWithIds = useMemo(() => tokens.map((token) => ({ ...token, id: token._id })), [tokens])

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      const tokenTexts = value
        .split(',')
        .map((tokenText) => tokenText.trim())
        .filter((tokenText) => tokenText.length > 0)

      if (tokenTexts.length > 0) {
        onAdd(tokenTexts)
        setValue('')
      }
    }
  }

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <TextInputWithTokens
        block
        onChange={handleValueChange}
        onKeyDown={handleKeyDown}
        onTokenRemove={onDelete}
        size="large"
        sx={textInputStyle}
        tokenComponent={TokensEditorToken}
        tokens={tokensWithIds}
        value={value}
      />
      <FormControl.Caption>{caption}</FormControl.Caption>
    </FormControl>
  )
}

function TokensEditorToken(props: TokenProps) {
  return <PrimerToken {...props} sx={tokenStyle} />
}

interface TokensEditorProps {
  caption: string
  label: string
  onAdd: (newTexts: Token['text'][]) => void
  onDelete: (deletedId: Token['_id']) => void
  tokens: Token[]
}

export interface Token {
  _id: string | number
  text: string
}
