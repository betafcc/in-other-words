import React, { FC, useReducer } from 'react'

import { InOtherWords } from './InOtherWords'
import { initial, reducer } from '../program'

export const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initial)

  return (
    <InOtherWords
      {...state}
      translate={(languages) => {
        console.log(languages)
        dispatch({ type: 'start' })
      }}
      focus={(index) => dispatch({ type: 'focus', payload: index })}
      setInput={(value) => dispatch({ type: 'setInput', payload: value })}
      setSearch={(value) => dispatch({ type: 'setSearch', payload: value })}
      addLanguage={(code) => dispatch({ type: 'addLanguage', payload: code })}
      editLanguage={(code) => dispatch({ type: 'editLanguage', payload: code })}
      removeLanguage={() => dispatch({ type: 'removeLanguage' })}
    />
  )
}
