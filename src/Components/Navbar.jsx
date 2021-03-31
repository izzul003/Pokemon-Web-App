import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import logo from '../Images/pokemon-logo.png'
import compass from '../Images/compass.png'
import bag from '../Images/bag.png'
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

export default function Navbar(){
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className="navbar">
      <AppBar position="static" classes={{root: classes.viewApp}}>
        <Toolbar classes={{root: classes.spacing}}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>{history.push('/')}} >
            <img src={logo} style={{height: '45px'}}/>
          </IconButton>
          <div className="padding-0">
          <ButtonBase color="inherit" onClick={()=>{history.push('/')}} classes={{root: classes.buttonNavItem}}>
            <img src={compass} style={{height: '43px'}}/>
            <Typography variant="subtitle" >Explore</Typography>
          </ButtonBase>
          <ButtonBase color="inherit" onClick={()=>{history.push('/list')}} classes={{root: classes.buttonNavItem}}>
            <img src={bag} style={{height: '43px'}}/>
            <Typography variant="subtitle" >My Pokemon List</Typography>
          </ButtonBase>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

