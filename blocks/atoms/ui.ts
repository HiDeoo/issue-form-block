import { atom } from 'jotai'

export const selectedPanelAtom = atom<Panel>('editor')

type Panel = 'editor' | 'preview'
