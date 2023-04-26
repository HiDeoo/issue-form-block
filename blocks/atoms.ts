import { atom, type PrimitiveAtom } from 'jotai'

import type { IssueFormDetails, IssueFormElement } from './libs/issueForm'

export const issueFormBodyAtom = atom<PrimitiveAtom<IssueFormElement>[] | undefined>(undefined)
export const issueFormDetailsAtom = atom<IssueFormDetails | undefined>(undefined)
