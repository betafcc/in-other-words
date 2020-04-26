export type ActionType<K, P> = {
  type: K
  payload: P
}

export type Action =
  | ActionType<'changeInput', string>
  | ActionType<'setRunning', boolean>
  | ActionType<'addLanguage', { code: string }>
  | ActionType<'changeSelectionInput', string>
  | ActionType<'hideLanguageSelection', undefined>
  | ActionType<'showLanguageSelection', { selected?: string }>
  | ActionType<'selectLanguage', { code: string }>
