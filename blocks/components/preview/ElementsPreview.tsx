import { useIssueFormElements } from '../../hooks/useIssueFormElements'

export function ElementsPreview() {
  const elements = useIssueFormElements()

  // FIXME(HiDeoo)
  elements

  return <div>ElementsPreview</div>
}

// FIXME(HiDeoo)
// export function Elem({ atom }: ElemeProps) {
//   const element = useAtomValue(atom)

//   // FIXME(HiDeoo)
//   console.error('🚨 [Preview.tsx:32] PREVIEW:', element.type)

//   return <div>{element.type}</div>
// }

// interface ElemeProps {
//   atom: PrimitiveAtom<IssueFormElement>
// }
