import React, { FC, useEffect, useState } from 'react'

import { Translator } from '../Translator'

const translator = Translator.create()

export const App: FC<{}> = () => {
  const [text, setText] = useState('Olá Mundo')

  useEffect(() => {
    translator
      .translate(text, { from: 'pt', to: 'zh' } as any)
      .then((res) => {
        console.log(res)
        setText(res)
      })
      .catch((err) => {
        console.error(err)
      })
  })

  return <h1>{text}</h1>
}
