import { useAtomValue } from 'jotai'

import { issueFormElementsAtom } from '../../atoms/issueForm'

import { ElementPreview } from './ElementPreview'

export function ElementsPreview() {
  const elements = useAtomValue(issueFormElementsAtom)

  return (
    <>
      {elements.map((element) => (
        <ElementPreview atom={element} key={element.toString()} />
      ))}
    </>
  )
}