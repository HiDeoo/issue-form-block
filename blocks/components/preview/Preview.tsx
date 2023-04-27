import { Panel } from '../Panel'

import { ElementsPreview } from './ElementsPreview'
import { MetadataPreview } from './MetadataPreview'

export function Preview() {
  return (
    <Panel>
      <MetadataPreview />
      <ElementsPreview />
    </Panel>
  )
}
