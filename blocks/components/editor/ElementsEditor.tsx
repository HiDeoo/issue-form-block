import { useIssueFormElements } from '../../hooks/useIssueFormElements'

export function ElementsEditor() {
  const elements = useIssueFormElements()

  // FIXME(HiDeoo)
  elements

  return <div>ElementsEditor</div>
}

// FIXME(HiDeoo)
// export function Elem({ atom }: ElemeProps) {
//   const [element, setElement] = useAtom(atom)

//   // FIXME(HiDeoo)
//   console.error('🚨 [Preview.tsx:32] EDITOR:', element.type)

//   return (
//     <input
//       value={element.type}
//       onChange={(event) => {
//         setElement({
//           ...element,
//           // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
//           // @ts-ignore -- // FIXME(HiDeoo)
//           type: event.target.value,
//         })
//       }}
//     />
//   )
// }

// interface ElemeProps {
//   atom: PrimitiveAtom<IssueFormElement>
// }
