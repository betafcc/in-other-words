import YandexTranslate from 'yet-another-yandex-translate'

export class Translator {
  constructor(readonly yandexTranslate: YandexTranslate) {}

  static create(
    token: string = 'trnsl.1.1.20200420T225100Z.86349b444c5b9364.e7816b7b18bc06578c564e8e9c9da76a5bac78e7'
  ) {
    return new Translator(new YandexTranslate(token))
  }

  translate(text: string, option: Option): Promise<string> {
    return this.yandexTranslate.translateStr(text, option)
  }

  async getOptions(): Promise<Array<Option>> {
    return (await this.yandexTranslate.getLangs()).dirs
      .map((dir) => dir.split('-'))
      .map(([from, to]) => ({ from, to } as Option))
  }
}

export type Option =
  | { from: 'az'; to: 'ru' }
  | { from: 'be'; to: 'bg' }
  | { from: 'be'; to: 'cs' }
  | { from: 'be'; to: 'de' }
  | { from: 'be'; to: 'en' }
  | { from: 'be'; to: 'es' }
  | { from: 'be'; to: 'fr' }
  | { from: 'be'; to: 'it' }
  | { from: 'be'; to: 'pl' }
  | { from: 'be'; to: 'ro' }
  | { from: 'be'; to: 'ru' }
  | { from: 'be'; to: 'sr' }
  | { from: 'be'; to: 'tr' }
  | { from: 'bg'; to: 'be' }
  | { from: 'bg'; to: 'ru' }
  | { from: 'bg'; to: 'uk' }
  | { from: 'ca'; to: 'en' }
  | { from: 'ca'; to: 'ru' }
  | { from: 'cs'; to: 'be' }
  | { from: 'cs'; to: 'en' }
  | { from: 'cs'; to: 'ru' }
  | { from: 'cs'; to: 'uk' }
  | { from: 'da'; to: 'en' }
  | { from: 'da'; to: 'ru' }
  | { from: 'de'; to: 'be' }
  | { from: 'de'; to: 'en' }
  | { from: 'de'; to: 'es' }
  | { from: 'de'; to: 'fr' }
  | { from: 'de'; to: 'it' }
  | { from: 'de'; to: 'ru' }
  | { from: 'de'; to: 'tr' }
  | { from: 'de'; to: 'uk' }
  | { from: 'el'; to: 'en' }
  | { from: 'el'; to: 'ru' }
  | { from: 'en'; to: 'be' }
  | { from: 'en'; to: 'ca' }
  | { from: 'en'; to: 'cs' }
  | { from: 'en'; to: 'da' }
  | { from: 'en'; to: 'de' }
  | { from: 'en'; to: 'el' }
  | { from: 'en'; to: 'es' }
  | { from: 'en'; to: 'et' }
  | { from: 'en'; to: 'fi' }
  | { from: 'en'; to: 'fr' }
  | { from: 'en'; to: 'hu' }
  | { from: 'en'; to: 'it' }
  | { from: 'en'; to: 'lt' }
  | { from: 'en'; to: 'lv' }
  | { from: 'en'; to: 'mk' }
  | { from: 'en'; to: 'nl' }
  | { from: 'en'; to: 'no' }
  | { from: 'en'; to: 'pt' }
  | { from: 'en'; to: 'ru' }
  | { from: 'en'; to: 'sk' }
  | { from: 'en'; to: 'sl' }
  | { from: 'en'; to: 'sq' }
  | { from: 'en'; to: 'sv' }
  | { from: 'en'; to: 'tr' }
  | { from: 'en'; to: 'uk' }
  | { from: 'es'; to: 'be' }
  | { from: 'es'; to: 'de' }
  | { from: 'es'; to: 'en' }
  | { from: 'es'; to: 'ru' }
  | { from: 'es'; to: 'uk' }
  | { from: 'et'; to: 'en' }
  | { from: 'et'; to: 'ru' }
  | { from: 'fi'; to: 'en' }
  | { from: 'fi'; to: 'ru' }
  | { from: 'fr'; to: 'be' }
  | { from: 'fr'; to: 'de' }
  | { from: 'fr'; to: 'en' }
  | { from: 'fr'; to: 'ru' }
  | { from: 'fr'; to: 'uk' }
  | { from: 'hr'; to: 'ru' }
  | { from: 'hu'; to: 'en' }
  | { from: 'hu'; to: 'ru' }
  | { from: 'hy'; to: 'ru' }
  | { from: 'it'; to: 'be' }
  | { from: 'it'; to: 'de' }
  | { from: 'it'; to: 'en' }
  | { from: 'it'; to: 'ru' }
  | { from: 'it'; to: 'uk' }
  | { from: 'lt'; to: 'en' }
  | { from: 'lt'; to: 'ru' }
  | { from: 'lv'; to: 'en' }
  | { from: 'lv'; to: 'ru' }
  | { from: 'mk'; to: 'en' }
  | { from: 'mk'; to: 'ru' }
  | { from: 'nl'; to: 'en' }
  | { from: 'nl'; to: 'ru' }
  | { from: 'no'; to: 'en' }
  | { from: 'no'; to: 'ru' }
  | { from: 'pl'; to: 'be' }
  | { from: 'pl'; to: 'ru' }
  | { from: 'pl'; to: 'uk' }
  | { from: 'pt'; to: 'en' }
  | { from: 'pt'; to: 'ru' }
  | { from: 'ro'; to: 'be' }
  | { from: 'ro'; to: 'ru' }
  | { from: 'ro'; to: 'uk' }
  | { from: 'ru'; to: 'az' }
  | { from: 'ru'; to: 'be' }
  | { from: 'ru'; to: 'bg' }
  | { from: 'ru'; to: 'ca' }
  | { from: 'ru'; to: 'cs' }
  | { from: 'ru'; to: 'da' }
  | { from: 'ru'; to: 'de' }
  | { from: 'ru'; to: 'el' }
  | { from: 'ru'; to: 'en' }
  | { from: 'ru'; to: 'es' }
  | { from: 'ru'; to: 'et' }
  | { from: 'ru'; to: 'fi' }
  | { from: 'ru'; to: 'fr' }
  | { from: 'ru'; to: 'hr' }
  | { from: 'ru'; to: 'hu' }
  | { from: 'ru'; to: 'hy' }
  | { from: 'ru'; to: 'it' }
  | { from: 'ru'; to: 'lt' }
  | { from: 'ru'; to: 'lv' }
  | { from: 'ru'; to: 'mk' }
  | { from: 'ru'; to: 'nl' }
  | { from: 'ru'; to: 'no' }
  | { from: 'ru'; to: 'pl' }
  | { from: 'ru'; to: 'pt' }
  | { from: 'ru'; to: 'ro' }
  | { from: 'ru'; to: 'sk' }
  | { from: 'ru'; to: 'sl' }
  | { from: 'ru'; to: 'sq' }
  | { from: 'ru'; to: 'sr' }
  | { from: 'ru'; to: 'sv' }
  | { from: 'ru'; to: 'tr' }
  | { from: 'ru'; to: 'uk' }
  | { from: 'sk'; to: 'en' }
  | { from: 'sk'; to: 'ru' }
  | { from: 'sl'; to: 'en' }
  | { from: 'sl'; to: 'ru' }
  | { from: 'sq'; to: 'en' }
  | { from: 'sq'; to: 'ru' }
  | { from: 'sr'; to: 'be' }
  | { from: 'sr'; to: 'ru' }
  | { from: 'sr'; to: 'uk' }
  | { from: 'sv'; to: 'en' }
  | { from: 'sv'; to: 'ru' }
  | { from: 'tr'; to: 'be' }
  | { from: 'tr'; to: 'de' }
  | { from: 'tr'; to: 'en' }
  | { from: 'tr'; to: 'ru' }
  | { from: 'tr'; to: 'uk' }
  | { from: 'uk'; to: 'bg' }
  | { from: 'uk'; to: 'cs' }
  | { from: 'uk'; to: 'de' }
  | { from: 'uk'; to: 'en' }
  | { from: 'uk'; to: 'es' }
  | { from: 'uk'; to: 'fr' }
  | { from: 'uk'; to: 'it' }
  | { from: 'uk'; to: 'pl' }
  | { from: 'uk'; to: 'ro' }
  | { from: 'uk'; to: 'ru' }
  | { from: 'uk'; to: 'sr' }
  | { from: 'uk'; to: 'tr' }
