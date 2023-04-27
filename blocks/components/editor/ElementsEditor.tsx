import { useAtomValue } from 'jotai'

import { issueFormElementsAtom } from '../../atoms/issueForm'

import { ElementEditor } from './ElementEditor'

export function ElementsEditor() {
  const elements = useAtomValue(issueFormElementsAtom)

  return (
    <>
      {elements.map((element) => (
        <ElementEditor atom={element} key={element.toString()} />
      ))}
    </>
  )
}
