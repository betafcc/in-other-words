import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button, { ButtonProps } from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  root: {
    borderStyle: 'dashed',
    color: theme.palette.text.disabled,

    '&:hover': {
      color: theme.palette.text.primary,
      borderColor: theme.palette.text.primary,
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  },
}))

export type LanguageAddButtonProps = ButtonProps

export const LanguageAddButton: FC<LanguageAddButtonProps> = ({ ...props }) => {
  const classes = useStyles()

  return (
    <Button className={classes.root} variant='outlined' {...props}>
      <AddIcon />
    </Button>
  )
}
