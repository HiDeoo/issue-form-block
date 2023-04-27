import { atom, type PrimitiveAtom } from 'jotai'

import type { IssueFormElement, IssueFormMetadata, TextareaElement } from './libs/issueForm'

export const selectedPanelAtom = atom<Panel>('editor')

export const issueFormMetadataAtom = atom<IssueFormMetadata>({ description: '', name: '' })
export const issueFormElementsAtom = atom<PrimitiveAtom<IssueFormElement>[]>([])

export function isTextareaAtom(atom: unknown, element: IssueFormElement): atom is PrimitiveAtom<TextareaElement> {
  return element.type === 'textarea'
}

type Panel = 'editor' | 'preview'
