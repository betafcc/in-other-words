import React, { FC } from 'react'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import GithubIcon from '@material-ui/icons/GitHub'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'white',
    borderBottom: '1px solid rgba(0,0,0,0.12)',
    color: '#5f6368',
  },

  menuButton: {},

  title: {
    flexGrow: 1,
  },
}))

export const AppBar: FC = () => {
  const classes = useStyles()

  return (
    <MuiAppBar position='static' elevation={0} className={classes.appBar}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          In Other
          <span style={{ color: '#4285f4' }}> W</span>
          <span style={{ color: '#ea4335' }}>o</span>
          <span style={{ color: '#fbbc05' }}>r</span>
          <span style={{ color: '#34a853' }}>d</span>
          <span style={{ color: '#4285f4' }}>s</span>
        </Typography>
        <IconButton
          href='https://github.com/betafcc/in-other-words'
          // target='_blank'
          // rel='noopener noreferrer'
          edge='end'
          className={classes.menuButton}
          color='inherit'
        >
          <GithubIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  )
}
