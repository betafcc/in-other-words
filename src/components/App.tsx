import React, { FC, useReducer, useEffect } from 'react'
import queryString from 'query-string'

import { InOtherWords } from './InOtherWords'
import { initial, reducer, State } from '../program'
import { Translator } from '../Translator'

const setQuery = (state: State) => {
  const newurl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    '?' +
    queryString.stringify(
      Object.fromEntries(
        [
          ['i', state.inputValue],
          ['o', state.outputValue],
          ['l', state.languages],
        ].filter((e) => !!e[1])
      ),
      { arrayFormat: 'comma' }
    )

  window.history.pushState({ path: newurl }, '', newurl)
}

const getQuery = (): Partial<State> => {
  const q = queryString.parse(window.location.search, { arrayFormat: 'comma' }) as any

  return {
    inputValue: q.i || '',
    outputValue: q.o || '',
    languages: q.l === undefined ? [] : Array.isArray(q.l) ? q.l : [q.l],
  }
}

const queryInitial = getQuery()

export const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    ...initial,
    ...queryInitial,
  })

  useEffect(() => setQuery(state))

  return (
    <>
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
      <a
        style={{
          display: 'block',
          textAlign: 'right',
          marginTop: '0.5em',
          marginRight: '0.5em',
          textDecoration: 'none',
          color: '#333'
        }}
        href='http://translate.yandex.com'
      >
        Powered by Yandex
      </a>
    </>
  )
}
