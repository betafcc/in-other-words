import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import TextareaAutosize, {
  TextareaAutosizeProps,
} from '@material-ui/core/TextareaAutosize'
import TranslateIcon from '@material-ui/icons/Translate'
import { makeStyles } from '@material-ui/core/styles'

import { State } from '../program'
import { LanguageButton } from './LanguageButton'
import { LanguageAddButton } from './LanguageAddButton'
import { LanguageSearch } from './LanguageSearch'

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

  main: {
    position: 'relative',
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

  languageSearch: {
    position: 'absolute',
    width: '100%',
    top: 0,
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

  outputRunning: {
    color: theme.palette.text.disabled,
  },
}))

export type Dispatchers = {
  translate: (languages: State['languages']) => void
  focus: (index: number) => void
  setInput: (value: string) => void
  setSearch: (value: string) => void
  addLanguage: (code: string) => void
  removeLanguage: () => void
  editLanguage: (code: string) => void
  closeSearch: () => void
}

export const InOtherWords: FC<State & Dispatchers> = ({
  status,
  languages,
  focused,
  searchValue,
  inputValue,
  outputValue,
  done,

  translate,
  focus,
  setInput,
  setSearch,
  addLanguage,
  removeLanguage,
  editLanguage,
  closeSearch,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.bar}>
        <Button
          disabled={status === 'running'}
          variant='outlined'
          onClick={(_) => translate(languages)}
        >
          <TranslateIcon />
        </Button>
        <Divider orientation='vertical' flexItem />
        <Languages
          languages={languages}
          status={status}
          done={done}
          focused={focused}
          focus={focus}
        />
      </div>
      <div className={classes.main}>
        <Card className={classes.content} elevation={3}>
          <CardContent>
            <Textarea value={inputValue} onChange={(e) => setInput(e.target.value)} />
          </CardContent>
          <CardContent>
            <Textarea
              disabled
              className={status === 'running' ? classes.outputRunning : ''}
              value={outputValue}
            />
          </CardContent>
        </Card>
        {status === 'editing' ? (
          <div className={classes.languageSearch}>
            <LanguageSearch
              searchValue={searchValue}
              selected={languages[focused]}
              onSearchValueChange={(value) => setSearch(value)}
              onSelect={(code) => {
                if (focused >= languages.length) addLanguage(code)
                else editLanguage(code)
              }}
              onRemove={removeLanguage}
              onClose={closeSearch}
            />
          </div>
        ) : null}
      </div>
      <a
        style={{
          display: 'block',
          textAlign: 'right',
          marginTop: '0.5em',
          marginRight: '0.5em',
          textDecoration: 'none',
          color: '#333',
        }}
        href='http://translate.yandex.com'
      >
        Powered by Yandex
      </a>
    </div>
  )
}

export const Languages: FC<
  Pick<State, 'status' | 'languages' | 'done' | 'focused'> & Pick<Dispatchers, 'focus'>
> = ({ status, languages, done, focused, focus }) => {
  const classes = useStyles()

  return (
    <div className={classes.languages}>
      {languages.map((code, i) => (
        <LanguageButton
          key={`${code}-${i}`}
          status={languageButtonState({ status, done, focused }, i)}
          code={code}
          onClick={() => focus(i)}
        />
      ))}
      {status === 'running' || languages.length >= 10 ? null : (
        <LanguageAddButton onClick={() => focus(languages.length)} />
      )}
    </div>
  )
}

const languageButtonState: (
  state: Pick<State, 'status' | 'done' | 'focused'>,
  i: number
) => 'default' | 'focused' | 'done' | 'loading' | 'waiting' = (state, i) => {
  if (state.status === 'running') {
    if (i < state.done) return 'done'
    else if (i === state.done) return 'loading'
    else return 'waiting'
  } else {
    if (state.status === 'editing' && i === state.focused) return 'focused'
    else return 'default'
  }
}

export const Textarea: FC<TextareaAutosizeProps> = ({ className, ...props }) => {
  const classes = useStyles()

  return (
    <TextareaAutosize
      className={classes.textarea + ' ' + className}
      rows={9}
      spellCheck={false}
      autoCapitalize='off'
      autoComplete='off'
      autoCorrect='off'
      {...props}
    />
  )
}
