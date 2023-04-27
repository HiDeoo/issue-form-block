import { atom, type PrimitiveAtom } from 'jotai'

import type { IssueFormElement, IssueFormMetadata } from './libs/issueForm'

export const selectedPanelAtom = atom<Panel>('editor')

export const issueFormMetadataAtom = atom<IssueFormMetadata | undefined>(undefined)
export const issueFormElementsAtom = atom<PrimitiveAtom<IssueFormElement>[] | undefined>(undefined)

type Panel = 'editor' | 'preview'
