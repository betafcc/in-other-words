import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import { codes } from '../Translator'

const useStyles = makeStyles((theme) => ({
  default: {},
  focused: {
    borderColor: '#000',
    borderWidth: '2px',
  },
  done: {
    borderColor: theme.palette.success.light,
    borderWidth: '2px',
    pointerEvents: 'none',
  },
  loading: {
    borderColor: theme.palette.warning.light,
    borderWidth: '2px',
    pointerEvents: 'none',
  },
  waiting: {
    opacity: 0.4,
    pointerEvents: 'none',
  },
}))

export type LanguageButtonProps = {
  code: string
  status: 'default' | 'focused' | 'done' | 'loading' | 'waiting'
  onClick: () => void
}

export const LanguageButton: FC<LanguageButtonProps> = ({
  code,
  status = 'default',
  onClick,
}) => {
  const classes = useStyles()

  return (
    <Button variant='outlined' className={classes[status]} onClick={onClick}>
      {codes[code]}
    </Button>
  )
}

export const Example: FC = () => (
  <>
    {(['default', 'done', 'loading', 'waiting'] as const).map((s) => (
      <LanguageButton key={s} code={s} status={s} onClick={() => console.log(s)} />
    ))}
  </>
)
