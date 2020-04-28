import React, { FC } from 'react'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'white',
    borderBottom: '1px solid black',
    color: 'black',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 1,
  },
}))

export const AppBar: FC = () => {
  const classes = useStyles()

  return (
    <MuiAppBar position='static' elevation={0} className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' className={classes.title}>
          News
        </Typography>
        <Button color='inherit'>Login</Button>
      </Toolbar>
    </MuiAppBar>
  )
}
