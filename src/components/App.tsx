import React, { FC, useEffect, useState } from 'react'

import translate from '../translate'

export const App: FC<{}> = () => {
  const [text, setText] = useState('Olá Mundo')

  useEffect(() => {
    translate(text, { to: 'en' })
      .then((res) => {
        console.log(res.text)
        setText(res.text)
        //=> I speak English
        console.log(res.from.language.iso)
        //=> nl
      })
      .catch((err) => {
        console.error(err)
      })
  })

  return <h1>{text}</h1>
}
