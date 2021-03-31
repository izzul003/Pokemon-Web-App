import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0
  },
  viewApp: {
    backgroundColor: '#0e9aa7',
    paddingTop: 0,
    paddingBottom: 0
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold'
  },
  logo: {
    height: '80px',    
  },
  spacing: {
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingBottom: 0,
  },
  buttonNavItem: {
    flexDirection: 'column',
    padding: 4,
    paddingTop: 8,
    paddingBottom: 5,
    '&:hover': {
      backgroundColor: '#3da4ab',
      borderColor: '#3da4ab',
      boxShadow: 'none',
      marginTop: 0,
      height: '100%',
    },
    '&:active': {
      boxShadow: '0 0 0 0.2rem rgb(61, 164, 171, 0.7)',
      backgroundColor: '#3da4ab',
      borderColor: '#3da4ab',
    },
    '&:focus': {
      backgroundColor: '#3da4ab',
      boxShadow: '0 0 0 0.2rem rgb(61, 164, 171, 0.7)',
    },
  }
}));

export default function NavbarBack(){
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className="navbar-back">
      <AppBar position="static" classes={{root: classes.viewApp}}>
        <Toolbar classes={{root: classes.spacing}}>
          <IconButton edge="start" className={classes.menuButtonBack} color="inherit" aria-label="menu" onClick={()=>{history.push('/')}} >
            <ArrowBackIosIcon />
            <Typography variant="body2" >Back</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

