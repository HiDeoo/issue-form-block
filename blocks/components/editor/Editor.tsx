import { Panel } from '../Panel'

import { ElementsEditor } from './ElementsEditor'
import { MetadataEditor } from './MetadataEditor'

export function Editor() {
  return (
    <Panel>
      <MetadataEditor />
      <ElementsEditor />
    </Panel>
  )
}
