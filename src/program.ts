import { Msg, asReducer } from './util'

export type State = {
  languages: Array<string>
  focused: number
  editing: boolean
  searchValue: string

  inputValue: string
  outputValue: string

  running: boolean
  done: number
}

export const initial: State = {
  languages: [],
  focused: 0,
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
  | Msg<'editLanguage', string>
  | Msg<'setInput', string>
  | Msg<'setSearch', string>
  | Msg<'focus', number>
  | Msg<'start'>
  | Msg<'stop'>
  | Msg<'receive', string>

export const reducer = asReducer<State, Action>((s, a) => {
  switch (a.type) {
    case 'addLanguage':
      return { editing: false, searchValue: '', languages: [...s.languages, a.payload] }
    case 'removeLanguage':
      return {
        editing: false,
        searchValue: '',
        languages: s.languages
          .slice(0, s.focused)
          .concat(s.languages.slice(s.focused + 1)),
      }
    case 'editLanguage':
      return {
        editing: false,
        searchValue: '',
        languages: s.languages.map((e, i) => (s.focused !== i ? e : a.payload)),
      }
    case 'setInput':
      return { inputValue: a.payload, outputValue: '' }
    case 'setSearch':
      return { searchValue: a.payload }
    case 'focus':
      return { focused: a.payload, editing: true }
    case 'start':
      return { done: 0, running: true }
    case 'stop':
      return { running: false }
    case 'receive':
      return { done: s.done + 1, outputValue: a.payload }
  }
})
