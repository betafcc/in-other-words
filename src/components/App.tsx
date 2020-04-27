import React, { FC, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {
  TextareaAutosize,
  TextareaAutosizeProps,
  Button,
  Divider,
} from '@material-ui/core'
import TranslateIcon from '@material-ui/icons/Translate'
import AddIcon from '@material-ui/icons/Add'

import * as Translator from '../Translator'
import { LanguageButton, Example } from './LanguageButton'
import { LanguageAddButton } from './LanguageAddButton'
import { Selection, LanguageSelection } from './LanguageSelection'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 1280,
    margin: '0 auto',
  },

  bar: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: 0,
    padding: '10px 0',

    '&> *': {
      margin: '0 4px',
    },
    // backgroundColor: '#ddd',
  },

  languages: {
    flexGrow: 1,
    display: 'flex',
    flexFlow: 'row wrap',
    overflowX: 'auto',

    '&> *': {
      margin: '4px',
    },
  },

  content: {
    minHeight: '20em',
    display: 'flex',
    flexFlow: 'row nowrap',
    '&> *': {
      width: '50%',
    },

    '&> *:nth-child(2)': {
      backgroundColor: '#f5f5f5',
    },
  },

  textarea: {
    width: '100%',
    height: '100%',
    background: 'none',
    fontSize: '1.5rem',
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
    overflow: 'auto hidden',
    outline: 'none',
    border: 'none',
    resize: 'none',
  },
}))

export const App: FC<{}> = () => {
  const classes = useStyles()
  const [source, setSource] = useState('')
  const [selected, setSelected] = useState(undefined as undefined | string)

  return (
    <div className={classes.root}>
      <LanguageSelection onSelection={(e) => setSelected(e)} selected={selected} />
      <div className={classes.bar}>
        <Play />
        <Divider orientation='vertical' flexItem />
        <Languages codes={['en', 'ru']} />
      </div>
      <Card className={classes.content} elevation={3}>
        <CardContent>
          <Textarea value={source} onChange={(e) => setSource(e.target.value)} />
        </CardContent>
        <CardContent>
          <Textarea disabled value={source} />
        </CardContent>
      </Card>
      <Example />
      <LanguageAddButton />
    </div>
  )
}

export const Play: FC<{}> = ({}) => (
  <Button variant='outlined'>
    <TranslateIcon />
  </Button>
)

export const Languages: FC<{ codes: Array<Translator.Code> }> = ({ codes }) => {
  const classes = useStyles()

  return (
    <div className={classes.languages}>
      {codes.map((c, i) => (
        <Button key={i} variant='outlined'>
          {Translator.codes[c]}
        </Button>
      ))}
      <Add />
    </div>
  )
}

export const Add: FC<{}> = ({}) => (
  <Button variant='outlined' style={{ borderStyle: 'dashed' }}>
    <AddIcon color='disabled' />
  </Button>
)

export const Textarea: FC<TextareaAutosizeProps> = (props) => {
  const classes = useStyles()

  return (
    <TextareaAutosize
      className={classes.textarea}
      rows={9}
      spellCheck={false}
      autoCapitalize='off'
      autoComplete='off'
      autoCorrect='off'
      {...props}
    />
  )
}
