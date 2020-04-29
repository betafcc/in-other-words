import { Msg, asReducer } from './util'

export type State = {
  status: 'editing' | 'running' | 'default'

  languages: Array<string>
  focused: number
  searchValue: string

  inputValue: string
  outputValue: string

  done: number
}

export const initial: State = {
  status: 'default',

  languages: [],
  focused: 0,
  searchValue: '',

  inputValue: '',
  outputValue: '',

  done: 0,
}

export type Action =
  | Msg<'addLanguage', string>
  | Msg<'removeLanguage'>
  | Msg<'editLanguage', string>
  | Msg<'setInput', string>
  | Msg<'setSearch', string>
  | Msg<'closeSearch'>
  | Msg<'focus', number>
  | Msg<'start'>
  | Msg<'stop'>
  | Msg<'receive', string>

export const reducer = asReducer<State, Action>((s, a) => {
  switch (a.type) {
    case 'addLanguage':
      return {
        status: 'default',
        searchValue: '',
        languages: [...s.languages, a.payload],
      }
    case 'removeLanguage':
      return {
        status: 'default',
        searchValue: '',
        languages: s.languages
          .slice(0, s.focused)
          .concat(s.languages.slice(s.focused + 1)),
      }
    case 'editLanguage':
      return {
        status: 'default',
        searchValue: '',
        languages: s.languages.map((e, i) => (s.focused !== i ? e : a.payload)),
      }
    case 'setInput':
      return { inputValue: a.payload, outputValue: '' }
    case 'setSearch':
      return { searchValue: a.payload }
    case 'closeSearch':
      return { status: 'default', searchValue: '' }
    case 'focus':
      return { status: 'editing', focused: a.payload }
    case 'start':
      return { status: 'running', done: 0 }
    case 'stop':
      return { status: 'default' }
    case 'receive':
      return { done: s.done + 1, outputValue: a.payload }
  }
})
