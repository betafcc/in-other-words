import React, { FC, useEffect, useState } from 'react'
import { tap } from 'rxjs/operators'

import { Translator } from '../Translator'

const translator = Translator.create()

const result$ = translator
  .inOtherWords(
    'The reason why we use Rx types like Observable, Observer, and Subscription is to get safety (such as the Observable Contract) and composability with Operators.',
    ['en', 'zh', 'ru', 'en', 'pt']
  )
  .pipe(tap(console.log))

export const App: FC<{}> = () => {
  const [text, setText] = useState('Olá Mundo')

  useEffect(() => {
    const subs = result$.subscribe({
      next: (r) => setText(r.result),
      complete: () => setText((text) => text + '.'),
    })

    return () => subs.unsubscribe()
  }, [])

  return <h1>{text}</h1>
}
