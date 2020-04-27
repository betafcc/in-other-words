import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase'
import ButtonBase, { ButtonBaseProps } from '@material-ui/core/ButtonBase'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import Paper from '@material-ui/core/Paper'
import { InputAdornment, IconButton } from '@material-ui/core'

import { languages } from '../Translator'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
  },

  input: {
    fontSize: theme.typography.h6.fontSize,
    width: '100%',
    padding: '1em',
    boxShadow: '0 2px 4px -1px rgba(0,0,0,0.2)',
  },

  item: {},

  selected: {
    background: 'blue',
  },

  options: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
}))

export const languagesOptions: Array<{
  id: string
  text: string
}> = languages.map((e) => ({ id: e.code, text: e.name }))

export type LanguageSelectionProps = {
  selected?: string
  onSelection: (id: string) => any
}

export const LanguageSelection: FC<LanguageSelectionProps> = ({
  selected,
  onSelection,
}) => (
  <Selection
    selected={!selected ? [] : [selected]}
    options={languagesOptions}
    onSelection={onSelection as any}
  />
)

export type SelectionProps = {
  options: Array<{
    id: number | string
    text: string
  }>
  selected?: Array<number | string>
  onSelection: (id: number | string) => any
}

export const Selection: FC<SelectionProps> = ({
  options,
  onSelection,
  selected = [],
}) => {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const valueLower = value.toLowerCase()

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder='Search Languages'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      <LanguageList>
        {options
          .filter((e) => e.text.toLowerCase().match(valueLower))
          .map((e) => (
            <li
              key={e.id}
              className={
                classes.item + (selected.includes(e.id) ? ' ' + classes.selected : '')
              }
            >
              <ButtonBase onClick={(_) => onSelection(e.id)}>{e.text}</ButtonBase>
            </li>
          ))}
      </LanguageList>
    </Paper>
  )
}

export const LanguageList: FC<{}> = ({ ...props }) => {
  const classes = useStyles()

  return <ul className={classes.options} {...props} />
}

// export const LanguageListItem: FC<{}> = ({}) => {
//   return <li className={}></li>
// }

export type Language = {
  code: string
  name: string
  selected: boolean
}
