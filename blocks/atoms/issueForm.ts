import { atom, type PrimitiveAtom } from 'jotai'

import type {
  CheckboxesElement,
  DropdownElement,
  InputElement,
  IssueFormElement,
  IssueFormMetadata,
  MarkdownElement,
  TextareaElement,
} from '../libs/issueForm'

export const issueFormMetadataAtom = atom<IssueFormMetadata>({ description: '', name: '' })
export const issueFormElementsAtom = atom<ElementAtom[]>([])

export const deleteIssueFormElementAtom = atom(null, (_get, set, elementAtom: ElementAtom) => {
  set(issueFormElementsAtom, (prevElements) => prevElements.filter((element) => element !== elementAtom))
})

export const toggleCollapsedIssueFormElementAtom = atom(null, (_get, set, elementAtom: ElementAtom) => {
  // @ts-expect-error -- we are only updating the internal _collapsed property which is shared by all elements.
  set(elementAtom, (prevElement) => ({ ...prevElement, _collapsed: !prevElement._collapsed }))
})

export const setCollapsedIssueFormElementsAtom = atom(null, (get, set, collapased: boolean) => {
  const elementAtoms = get(issueFormElementsAtom)

  for (const elementAtom of elementAtoms) {
    // @ts-expect-error -- we are only updating the internal _collapsed property which is shared by all elements.
    set(elementAtom, (prevElement) => ({ ...prevElement, _collapsed: collapased }))
  }
})

export function createTextareaAtom(): TextareaElementAtom {
  return atom({
    attributes: {
      label: 'New textarea',
    },
    type: 'textarea',
  })
}

export function isCheckboxesAtom(_atom: ElementAtom, element: IssueFormElement): _atom is CheckboxesElementAtom {
  return element.type === 'checkboxes'
}

export function isDropdownAtom(_atom: ElementAtom, element: IssueFormElement): _atom is DropdownElementAtom {
  return element.type === 'dropdown'
}

export function isInputAtom(_atom: ElementAtom, element: IssueFormElement): _atom is InputElementAtom {
  return element.type === 'input'
}

export function isMarkdownAtom(_atom: ElementAtom, element: IssueFormElement): _atom is MarkdownElementAtom {
  return element.type === 'markdown'
}

export function isTextareaAtom(_atom: ElementAtom, element: IssueFormElement): _atom is TextareaElementAtom {
  return element.type === 'textarea'
}

export type CheckboxesElementAtom = PrimitiveAtom<CheckboxesElement>
export type DropdownElementAtom = PrimitiveAtom<DropdownElement>
export type InputElementAtom = PrimitiveAtom<InputElement>
export type MarkdownElementAtom = PrimitiveAtom<MarkdownElement>
export type TextareaElementAtom = PrimitiveAtom<TextareaElement>

export type ElementAtom =
  | PrimitiveAtom<CheckboxesElement>
  | PrimitiveAtom<DropdownElement>
  | PrimitiveAtom<InputElement>
  | PrimitiveAtom<MarkdownElement>
  | PrimitiveAtom<TextareaElement>
