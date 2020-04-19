import YandexTranslate from 'yet-another-yandex-translate'
import { Observable } from 'rxjs'

export class Translator {
  constructor(readonly yandexTranslate: YandexTranslate) {}

  static create(
    token: string = 'trnsl.1.1.20200420T225100Z.86349b444c5b9364.e7816b7b18bc06578c564e8e9c9da76a5bac78e7'
  ) {
    return new Translator(new YandexTranslate(token))
  }

  async translate(source: string, option: Option): Promise<Result> {
    return {
      source,
      result: await this.yandexTranslate.translateStr(source, option),
      ...option,
    }
  }

  pipe(source: string, codes: Array<Code>): Observable<Result> {
    return new Observable<Result>((observer) => {
      let unsubscribed = false

      const run = async () => {
        let current: Result = {
          source,
          result: source,
          from: codes[0],
          to: codes[0],
        }

        for (const code of codes.slice(1))
          if (!unsubscribed)
            observer.next(
              (current = await this.translate(current.result, {
                from: current.to,
                to: code,
              }))
            )
          else break

        observer.complete()
      }

      run()

      return () => (unsubscribed = true)
    })
  }

  async getOptions(): Promise<Array<Option>> {
    return (await this.yandexTranslate.getLangs()).dirs
      .map((dir) => dir.split('-'))
      .map(([from, to]) => ({ from, to } as Option))
  }
}

export type Result = Option & {
  source: string
  result: string
}

export type Option = { from: Code; to: Code }

export type Code = keyof typeof codes

export const codes = {
  az: 'Azerbaijan',
  ml: 'Malayalam',
  sq: 'Albanian',
  mt: 'Maltese',
  am: 'Amharic',
  mk: 'Macedonian',
  en: 'English',
  mi: 'Maori',
  ar: 'Arabic',
  mr: 'Marathi',
  hy: 'Armenian',
  mhr: 'Mari',
  af: 'Afrikaans',
  mn: 'Mongolian',
  eu: 'Basque',
  de: 'German',
  ba: 'Bashkir',
  ne: 'Nepali',
  be: 'Belarusian',
  no: 'Norwegian',
  bn: 'Bengali',
  pa: 'Punjabi',
  my: 'Burmese',
  pap: 'Papiamento',
  bg: 'Bulgarian',
  fa: 'Persian',
  bs: 'Bosnian',
  pl: 'Polish',
  cy: 'Welsh',
  pt: 'Portuguese',
  hu: 'Hungarian',
  ro: 'Romanian',
  vi: 'Vietnamese',
  ru: 'Russian',
  ht: 'Haitian (Creole)',
  ceb: 'Cebuano',
  gl: 'Galician',
  sr: 'Serbian',
  nl: 'Dutch',
  si: 'Sinhala',
  mrj: 'Hill Mari',
  sk: 'Slovakian',
  el: 'Greek',
  sl: 'Slovenian',
  ka: 'Georgian',
  sw: 'Swahili',
  gu: 'Gujarati',
  su: 'Sundanese',
  da: 'Danish',
  tg: 'Tajik',
  he: 'Hebrew',
  th: 'Thai',
  yi: 'Yiddish',
  tl: 'Tagalog',
  id: 'Indonesian',
  ta: 'Tamil',
  ga: 'Irish',
  tt: 'Tatar',
  it: 'Italian',
  te: 'Telugu',
  is: 'Icelandic',
  tr: 'Turkish',
  es: 'Spanish',
  udm: 'Udmurt',
  kk: 'Kazakh',
  uz: 'Uzbek',
  kn: 'Kannada',
  uk: 'Ukrainian',
  ca: 'Catalan',
  ur: 'Urdu',
  ky: 'Kyrgyz',
  fi: 'Finnish',
  zh: 'Chinese',
  fr: 'French',
  ko: 'Korean',
  hi: 'Hindi',
  xh: 'Xhosa',
  hr: 'Croatian',
  km: 'Khmer',
  cs: 'Czech',
  lo: 'Laotian',
  sv: 'Swedish',
  la: 'Latin',
  gd: 'Scottish',
  lv: 'Latvian',
  et: 'Estonian',
  lt: 'Lithuanian',
  eo: 'Esperanto',
  lb: 'Luxembourgish',
  jv: 'Javanese',
  mg: 'Malagasy',
  ja: 'Japanese',
  ms: 'Malay',
} as const
