import { Translator } from '../src/Translator'

Translator.create()
  .translate('Olá mundo, como você está?', { from: 'pt', to: 'ru' })
  .then(console.log)
