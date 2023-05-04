import { atom, type PrimitiveAtom } from 'jotai'

import type {
  CheckboxesElement,
  DropdownElement,
  InputElement,
  IssueForm,
  IssueFormElement,
  IssueFormMetadata,
  MarkdownElement,
  TextareaElement,
} from '../libs/issueForm'

const issueFormDefaultState: IssueForm = { elements: [], metadata: { description: '', name: '' } }

const issueFormInitialStateAtom = atom(issueFormDefaultState)

export const issueFormAtom = atom(
  () => issueFormDefaultState,
  (_get, set, issueForm: IssueForm) => {
    set(issueFormInitialStateAtom, issueForm)
    set(issueFormMetadataAtom, issueForm.metadata)
    set(issueFormElementsAtom, issueForm.elements.map(mapElementToElementAtom))
  }
)

export const issueFormMetadataAtom = atom<IssueFormMetadata>(issueFormDefaultState.metadata)
export const issueFormElementsAtom = atom<ElementAtom[]>(issueFormDefaultState.elements.map(mapElementToElementAtom))

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

export const resetIssueFormAtom = atom(null, (get, set) => {
  const issueForm = get(issueFormInitialStateAtom)

  set(issueFormMetadataAtom, issueForm.metadata)
  set(issueFormElementsAtom, issueForm.elements.map(mapElementToElementAtom))
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

function mapElementToElementAtom(element: IssueFormElement): ElementAtom {
  return atom(element) as ElementAtom
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
