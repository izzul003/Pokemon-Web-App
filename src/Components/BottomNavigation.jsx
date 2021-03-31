import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from "react-router-dom";
import compass from '../Images/compass.png'
import bag from '../Images/bag.png'
const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    width : '100vw',
    ['@media (min-width:600px)']:{
      display: 'none'
    },
    ['@media (max-width:600px)']:{
      display: 'block'
    },
    "&$selected": {
      color: "#0e9aa7"
    }
  },
  bottomAction: {
    fontWeight: 'bold',
  }
});

export default function BottomNavigationFunction () {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(0);
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Explore" classes={{root: classes.bottomAction}} icon={<img src={compass} style={{height: '35px'}}/>} color="primary" onClick={()=>{history.push('/')}}/>
      <BottomNavigationAction label="My Pokemon List" classes={{root: classes.bottomAction}}  icon={<img src={bag} style={{height: '35px'}}/>} color="primary" onClick={()=>{history.push('/list')}}/>
    </BottomNavigation>
  )
}