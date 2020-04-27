import { Msg, asReducer } from './util'

export type State = {
  languages: Array<string>
  focus: number
  editing: boolean
  searchValue: string

  inputValue: string
  outputValue: string

  running: boolean
  done: number
}

export const initial: State = {
  languages: [],
  focus: 0,
  editing: false,
  searchValue: '',

  inputValue: '',
  outputValue: '',

  running: false,
  done: 0,
}

export type Action =
  | Msg<'addLanguage', string>
  | Msg<'removeLanguage'>
  | Msg<'setInput', string>
  | Msg<'focus', number>
  | Msg<'edit'>
  | Msg<'start'>
  | Msg<'stop'>
  | Msg<'receive', string>

export const reducer = asReducer<State, Action>((s, a) => {
  switch (a.type) {
    case 'addLanguage':
      return { languages: [...s.languages, a.payload] }
    case 'removeLanguage':
      return {
        editing: false,
        languages: s.languages.slice(0, s.focus).concat(s.languages.slice(s.focus + 1)),
      }
    case 'setInput':
      return { inputValue: a.payload, outputValue: '' }
    case 'focus':
      return { focus: a.payload }
    case 'edit':
      return { editing: true }
    case 'start':
      return { done: 0, running: true }
    case 'stop':
      return { running: false }
    case 'receive':
      return { done: s.done + 1, outputValue: a.payload }
  }
})
