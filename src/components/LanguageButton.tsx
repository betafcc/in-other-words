import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button, { ButtonProps } from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  default: {},
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
  language: string
  status?: 'default' | 'done' | 'loading' | 'waiting'
  onClick?: ButtonProps['onClick']
}

export const LanguageButton: FC<LanguageButtonProps> = ({
  language,
  status = 'default',
  onClick,
}) => {
  const classes = useStyles()

  return (
    <Button variant='outlined' className={classes[status]} onClick={onClick}>
      {language}
    </Button>
  )
}

export const Example: FC = () => (
  <>
    {(['default', 'done', 'loading', 'waiting'] as const).map((s) => (
      <LanguageButton key={s} language={s} status={s} onClick={(_) => console.log(s)} />
    ))}
  </>
)
