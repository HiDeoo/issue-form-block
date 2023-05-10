import { useElements } from '../../hooks/useElements'

import { ElementPreview } from './ElementPreview'

export function ElementsPreview() {
  const elements = useElements()

  return (
    <>
      {elements.map((element) => (
        <ElementPreview _id={element._id} key={element._id} type={element.type} />
      ))}
    </>
  )
}
