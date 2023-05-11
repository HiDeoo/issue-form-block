import { useErrorsStore, type ErrorsState } from '../stores/errors'

export function useErrors() {
  return useErrorsStore(selector)
}

function selector(state: ErrorsState) {
  return state.errors
}
