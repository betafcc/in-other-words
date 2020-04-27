import React, { FC } from 'react'

export type LanguageSearchProps = {
  searchValue: string
  selected?: undefined | string
  onSearchValueChange: (value: string) => void
  onSelect: (code: string) => void
  onRemove: () => void
}

export const LanguageSearch: FC<LanguageSearchProps> = () => {
  return <h1>HellO</h1>
}
