import { create } from 'zustand'

import type { IssueFormError } from '../libs/issueForm'

export const useErrorsStore = create<ErrorsState>()((set) => ({
  errors: [],
  actions: {
    setErrors: (errors) => set({ errors }),
  },
}))

export interface ErrorsState {
  errors: IssueFormError[]
  actions: {
    setErrors: (errors: IssueFormError[]) => void
  }
}
