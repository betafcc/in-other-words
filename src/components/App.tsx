import React, { FC, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { TextareaAutosize, TextareaAutosizeProps, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 1280,
    margin: '0 auto',
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

export const App: FC<{}> = () => {
  const classes = useStyles()
  const [source, setSource] = useState('')

  return (
    <div className={classes.root}>
      <h1 style={{ backgroundColor: 'purple', margin: 0 }}>Hello</h1>
      <Card className={classes.content} elevation={3}>
        <CardContent>
          <Textarea value={source} onChange={(e) => setSource(e.target.value)} />
        </CardContent>
        <CardContent>
          <Textarea disabled value={source} />
        </CardContent>
      </Card>
      <Button onClick={(_) => console.log(source)}>Hello</Button>
    </div>
  )
}
