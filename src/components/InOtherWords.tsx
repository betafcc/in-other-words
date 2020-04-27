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
}))

export type Dispatchers = {
  translate: (languages: State['languages']) => void
  focus: (index: number) => void
  setInput: (value: string) => void
  setSearch: (value: string) => void
  addLanguage: (code: string) => void
  removeLanguage: () => void
  editLanguage: (code: string) => void
}

export const InOtherWords: FC<State & Dispatchers> = ({
  languages,
  focused,
  editing,
  searchValue,
  inputValue,
  outputValue,
  running,
  done,

  translate,
  focus,
  setInput,
  setSearch,
  addLanguage,
  removeLanguage,
  editLanguage,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.bar}>
        <Button
          disabled={running}
          variant='outlined'
          onClick={(_) => translate(languages)}
        >
          <TranslateIcon />
        </Button>
        <Divider orientation='vertical' flexItem />
        <Languages
          languages={languages}
          running={running}
          editing={editing}
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
            <Textarea disabled value={outputValue} />
          </CardContent>
        </Card>
        {editing ? (
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
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export const Languages: FC<
  Pick<State, 'languages' | 'running' | 'editing' | 'done' | 'focused'> &
    Pick<Dispatchers, 'focus'>
> = ({ languages, running, editing, done, focused, focus }) => {
  const classes = useStyles()

  return (
    <div className={classes.languages}>
      {languages.map((code, i) => (
        <LanguageButton
          key={`${code}-${i}`}
          status={languageButtonState({ running, done, focused, editing }, i)}
          code={code}
          onClick={() => focus(i)}
        />
      ))}
      {languages.length >= 10 ? null : (
        <LanguageAddButton onClick={() => focus(languages.length)} />
      )}
    </div>
  )
}

const languageButtonState: (
  state: Pick<State, 'running' | 'editing' | 'done' | 'focused'>,
  i: number
) => 'default' | 'focused' | 'done' | 'loading' | 'waiting' = (state, i) => {
  if (state.running) {
    if (i < state.done) return 'done'
    else if (i === state.done) return 'loading'
    else return 'waiting'
  } else {
    if (state.editing && i === state.focused) return 'focused'
    else return 'default'
  }
}

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
