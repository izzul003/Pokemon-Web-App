import React, {useState, useContext, useEffect} from 'react';
import './Detail.css'
import {useQuery} from '@apollo/client';
import {GET_DETAIL_POKEMON} from '../../Queries';
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
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import NavbarBack from '../../Components/NavbarBack'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import runawaygif from '../../Images/runaway.gif'
import CreateIcon from '@material-ui/icons/Create';
import release from '../../Images/release.png'

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
  top5: {
    marginTop: '5%'
  },
  rootInput: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontWeight: 'bold',
    fontSize: 27
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  buttonCatch: {
    position: 'fixed',
    backgroundColor: 'transparent',
    padding: 10,
    bottom: 60,
    marginTop: 20,
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
}));

export default function Detail ({location}) {
  const {name} = useParams()
  const classes = useStyles();
  const history = useHistory()
  const {editDataPokemon , releaseDataPokemon, mylist} = useContext(GlobalState)
  const [value, setValue] = useState(0);
  const [pokemon, setPokemon] = useState(null);
  const [nameInput, setNameInput] = useState(name);
  const [modalrelease, setModalrelease] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [indexes, setIndexes] = useState([])
  const [data, setData] = useState(null)

  useEffect(() => {
    if(location.state){
      setData(location.state.data)
      setShowLoading(false)
      setPokemon({
        id: location.state.id,
        name:  location.state.data.pokemon.name,
        image: location.state.data.pokemon.sprites.front_default,
        data: location.state.data
      })
      let findAll = mylist.reduce(function(a, e, i) {
        if (e.name === location.state.data.name)
            a.push(i);
        return a;
      }, []);
      setIndexes(findAll)
    } else {
      setShowLoading(true)
    }
  }, [data])

  const handleRelease = (id) => {
    releaseDataPokemon(id)
    setModalrelease(true)
    setTimeout(()=>{
      history.push('/')
    },3000)
  }

  const handleUpdateData = () => {
    if (nameInput != pokemon.name) {
      editDataPokemon({
        id: pokemon.id,
        name: nameInput,
        image: pokemon.image,
        data: location.state.data
      })
      setShowInput(false)
    } else {
      setShowInput(false)
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

    if (modalrelease) {
    return(
      <div className="container">
        <img src={runawaygif} alt="gotcha"></img>
        <Typography variant="h3">Released! Good bye friend</Typography>
        <Button color="primary" variant="contained" onClick={()=>{history.push('/')}}>
          <ArrowBackIosIcon fontSize="large" color="disabled"/>
        </Button>
      </div>
    )
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
          { showInput ? 
          <Paper component="form" className={classes.rootInput}>
            <InputBase
              className={classes.input}
              value={nameInput}
              onChange={(event)=>{setNameInput(event.target.value)}}
            />
            <IconButton style={{ color: '#ffcc5c' }} className={classes.iconButton} aria-label="directions" onClick={()=>{handleUpdateData()}} >
              <CreateIcon />
            </IconButton>
          </Paper>:
            <Paper component="form"  className={classes.rootInput}>
            <Typography variant="h5" className={classes.input}>{nameInput}</Typography>
            <IconButton style={{ color: '#ffcc5c' }} className={classes.iconButton} aria-label="directions" onClick={()=>{setShowInput(true)}}>
              <CreateIcon />
            </IconButton>
          </Paper> }
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
      <BottomNavigationAction classes={{root: classes.buttonCatchAction}} label="Release" icon={<img src={release} style={{height: 60,}}  />} onClick={()=>{handleRelease(pokemon.id)}}/>
    </BottomNavigation>
      </>
  )
}
