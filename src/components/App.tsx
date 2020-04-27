import React, { FC, useReducer } from 'react'

import { InOtherWords } from './InOtherWords'
import { initial, reducer } from '../program'
import { Translator } from '../Translator'

export const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initial)

  return (
    <InOtherWords
      {...state}
      translate={async (languages) => {
        if (state.languages.length >= 2) {
          dispatch({ type: 'start' })

          for await (const el of Translator.create().inOtherWords(
            state.inputValue,
            state.languages as any
          )) {
            dispatch({ type: 'receive', payload: el.result })
          }

          dispatch({ type: 'stop' })
        }
      }}
      focus={(index) => dispatch({ type: 'focus', payload: index })}
      setInput={(value) => dispatch({ type: 'setInput', payload: value })}
      setSearch={(value) => dispatch({ type: 'setSearch', payload: value })}
      addLanguage={(code) => dispatch({ type: 'addLanguage', payload: code })}
      editLanguage={(code) => dispatch({ type: 'editLanguage', payload: code })}
      removeLanguage={() => dispatch({ type: 'removeLanguage' })}
      closeSearch={() => dispatch({ type: 'closeSearch' })}
    />
  )
}
