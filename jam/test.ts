import fetch from 'node-fetch'
import { Translator } from '../src/Translator'

Object.assign(global, { fetch })

const g = Translator.create().inOtherWords(
  'The reason why we use Rx types like Observable, Observer, and Subscription is to get safety (such as the Observable Contract) and composability with Operators.',
  ['en', 'zh', 'ru', 'en', 'pt']
)

const main = async () => {
  for await (const r of g) console.log(r)
}

main()
