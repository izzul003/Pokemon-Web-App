import React, {useState, useContext, useEffect} from 'react';
import './Detail.css'
import {useQuery} from '@apollo/client';
import {GET_DETAIL_POKEMON} from '../../Queries';
import {myListPokemons} from '../../Cache'
import {GlobalState} from '../../Context/GlobalState'
import {useHistory,useParams} from 'react-router-dom'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import gifLoading from '../../Images/loading.gif'
import NavbarBack from '../../Components/NavbarBack'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import gotchagif from '../../Images/gotcha.gif'
import runawaygif from '../../Images/runaway.gif'
import pokeball from '../../Images/pokeball.png'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 50,
    padding: 15,
    boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 20%)',
    marginRight: 20
  },
  boxDetail: {
    display: 'flex',
    flexDirection: 'row',
    borderleft: '1px solid #ccc!important',
    borderLeftWidth: 1
  },
  buttonType: {
    borderRadius: 50,
    padding: 12,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#ffcc5c'
  },
  buttonCatch: {
    position: 'fixed',
    padding: 10,
    bottom: 60,
    marginTop: 200,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#3da4ab',
      transition: '500ms',
      borderRadius: 15,
      marginTop: 10,
      marginBottom: 10
    },
    ['@media (min-width:600px)']:{
      bottom: 7
    },
    fontWeight: 'bold'
  },
  buttonCatchAction: {
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.5)',
    '&:hover': {
      fontWeight: 'bold',
      color: 'rgba(255,255,255,1)'
    }
  },
  top5: {
    marginTop: '5%'
  }
}));

export default function Detail ({location}) {
  const {name} = useParams()
  const classes = useStyles();
  const history = useHistory()
  const {addDataPokemon, releaseDataPokemon, mylist} = useContext(GlobalState)
  const [value, setValue] = useState(0);
  const [pokemon, setPokemon] = useState(null);
  const [probability, setProbability] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [propsdata, setPropsdata] = useState(location.state);
  const { loading, error, data } = useQuery(GET_DETAIL_POKEMON, {
    variables: {name},
  });
  
  useEffect(() => {
    if (loading) {
      setShowLoading(true)
    }
  }, [loading])

  useEffect(() => {
    if (error) {
      <div className="container">
        <strong>Error...</strong>
        {JSON.stringify(error)}
      </div>
    }
  }, [error])

  useEffect(() => {
    if(data){
      setShowLoading(false)
      setPokemon({
        id: mylist.length+1,
        name:  data.pokemon.name,
        image: data.pokemon.sprites.front_default,
        data
      })
    }
  }, [data])

  const handleCatch = (pokemon) => {
    let status = [true, false]
    let index = Math.floor(Math.random() * Math.floor(2))
    let result = status[index]
    
    if (result) {
      setProbability(result)
      addDataPokemon(pokemon)
      myListPokemons([...mylist,pokemon])
    } else {
      setProbability(result)
    }  
  }

 
  if (showLoading) {
    return (
      <div className="container">
      <img src={gifLoading} alt="loading"></img>
      <br />
      <strong>Loading...</strong>
    </div>
    )
  }

  if (probability != null) {
    if (probability) {
      return (
        <div className="container">
          <img src={gotchagif} alt="gotcha"></img>
          <Typography variant="h3">Success to catch</Typography>
          <Button color="primary" variant="contained"  onClick={()=>{
            setProbability(null)
            history.push('/detail-release/'+pokemon.name, {data})
          }}>
            <NavigateNextIcon fontSize="large" color="disabled"/>
          </Button>
        </div>
      )
    } else {
      return (
        <div className="container">
          <img src={runawaygif} alt="gotcha"></img>
          <Typography variant="h3">Oops run away</Typography>
          <Button color="primary" variant="contained" onClick={()=>{history.push('/')}}>
          <ArrowBackIosIcon fontSize="large" color="disabled"/>
          </Button>
        </div>
      )
    }
  } 

  return (
    <>
    <NavbarBack />
    <Container fixed>
      <Grid container
      direction="row" style={{marginBottom: 150}}>
        <Grid item lg={4} md={4} sm={12} xs={12} alignItems="center" justify="center" >
          <div className="bg-image">
            <img src={data && data.pokemon.sprites.front_default} className="image"/>
          </div>
          <Paper elevation={1} square={false}>
            <Typography variant="h4">{name}</Typography>
          </Paper>
          <div className="item-space">
          {data && data.pokemon.types.map((item,idx)=> {
            return <ButtonBase key={idx} classes={{root: classes.buttonType}} disabled><strong>{item.type.name}</strong></ButtonBase>
          })}
          </div>
        </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12} classes={{root: classes.top5}}>
              <div className="right-box">
              <Typography variant="h4" >Abilities</Typography>
              {data && data.pokemon.abilities.map((item,idx)=> {
                return <ButtonBase key={idx} classes={{root: classes.root}} disabled><strong>{item.ability.name}</strong></ButtonBase>
              })}
              </div>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12} classes={{root: classes.top5}}>
              <Typography variant="h4" >Move</Typography>
              {data && data.pokemon.moves.map((item,idx)=> {
                return <ButtonBase key={idx} classes={{root: classes.root}} disabled><strong>{item.move.name}</strong></ButtonBase>
              })}
            </Grid>
      </Grid>
    </Container>
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.buttonCatch}
    >
      <BottomNavigationAction classes={{root: classes.buttonCatchAction}} label="Catch" icon={<img src={pokeball} style={{height: 60,}}  />} onClick={()=>{handleCatch(pokemon)}}/>
    </BottomNavigation>
      </>
  )
}
