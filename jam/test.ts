import { Translator } from '../src/Translator'

Translator.create()
  .pipe(
    'The reason why we use Rx types like Observable, Observer, and Subscription is to get safety (such as the Observable Contract) and composability with Operators.',
    ['en', 'zh', 'ru', 'en', 'pt']
  )
  .subscribe({ next: console.log, complete: () => console.log('done') })
