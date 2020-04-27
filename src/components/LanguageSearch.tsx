import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import ButtonBase from '@material-ui/core/ButtonBase'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import CloseIcon from '@material-ui/icons/Close'
import Paper from '@material-ui/core/Paper'
import { InputAdornment, IconButton } from '@material-ui/core'
import { languages } from '../Translator'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    boxShadow: 'none',
  },

  input: {
    fontSize: theme.typography.h6.fontSize,
    width: '100%',
    padding: '0.4em',
    borderRadius: 0,
    boxShadow: '0 2px 4px -1px rgba(0,0,0,0.4)',
  },

  options: {
    margin: '4px 0 0 0',
    padding: 0,
    listStyle: 'none',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    boxShadow: '0 2px 4px -1px rgba(0,0,0,0.2)',
  },

  option: {
    fontSize: theme.typography.body1.fontSize,
    display: 'flex',
    padding: '0.5em',
  },

  selected: {
    background: 'blue',
  },
}))

export type LanguageSearchProps = {
  searchValue: string
  selected?: undefined | string
  onSearchValueChange: (value: string) => void
  onSelect: (code: string) => void
  onRemove: () => void
  onClose: () => void
}

export const LanguageSearch: FC<LanguageSearchProps> = ({
  searchValue,
  selected,
  onSearchValueChange,
  onSelect,
  onRemove,
  onClose,
}) => {
  const classes = useStyles()
  const searchValueLower = searchValue.toLowerCase()

  return (
    <Paper className={classes.root}>
      <InputBase
        autoFocus
        className={classes.input}
        placeholder='Search Languages'
        value={searchValue}
        onChange={(e) => onSearchValueChange(e.target.value)}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton onClick={(_) => onRemove()}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={(_) => onClose()}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      <ul className={classes.options}>
        {languages
          .filter((e) => e.name.toLowerCase().match(searchValueLower))
          .map((e) => (
            <li
              key={e.code}
              className={
                classes.option + ' ' + (e.code === selected ? classes.selected : '')
              }
            >
              <ButtonBase
                style={{ fontSize: 'inherit' }}
                onClick={(_) => onSelect(e.code)}
              >
                {e.name}
              </ButtonBase>
            </li>
          ))}
      </ul>
    </Paper>
  )
}
