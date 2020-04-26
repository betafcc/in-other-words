export type State = {
  languageButtons: Array<LanguageButton>
  languageSelection: LanguageSelection
  inputArea: InputArea
  outputArea: OutputArea
  running: boolean
}

export type LanguageButton = {
  id: number
  state: 'default' | 'done' | 'loading' | 'waiting'
  code: string
}

export type LanguageSelection = {
  showing: boolean
  selected?: string
  input?: string
}

export type InputArea = {
  enabled: boolean
  value: string
}

export type OutputArea = {
  state: 'default' | 'done' | 'loading'
  value: string
}

export const inital: State = {
  languageButtons: [],
  languageSelection: {
    showing: false,
    selected: undefined,
    input: undefined,
  },
  inputArea: {
    value: '',
    enabled: true,
  },
  outputArea: {
    value: '',
    state: 'default',
  },
  running: false,
}
