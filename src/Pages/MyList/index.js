import React, {useContext, useState} from 'react'
import './MyList.css'
import {GlobalState} from '../../Context/GlobalState'
import gifLoading from '../../Images/loading.gif'
import CardMyList from '../../Components/CardMyList';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";
import runawaygif from '../../Images/runaway.gif'
import { css } from '@emotion/css'

export default function MyList () {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false)
  const {mylist, releaseDataPokemon} = useContext(GlobalState)

  const handleRelease = (id)=> {
    releaseDataPokemon(id)
    setShowModal(true)
    setTimeout(()=>{
      history.push('/')
    },3000)
  }

  if (showModal) {
    return (
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
    <div className="container">
      <Grid container 
        spacing={3} 
        direction="row"
        justify="center"
        alignItems="center" 
        style={{margin: 'auto', width: '100%'}}>
      {
        mylist.length > 0 ?
            mylist.map((pokemon,idx)=>{
              return (<Grid item lg={2} sm={6} xs={6}>
                <div className={css`
                margin-bottom: 15px;
                &:hover {
                  margin-top: 10px;
                  margin-bottom: 5px;
                  transition: 500ms;
                }
                `}>
                  <CardMyList key={idx} pokemon={pokemon} handleRelease={handleRelease}/>
                </div>
              </Grid>)
            })
        : 
        <div>
          <img src={gifLoading} className="img-gif" alt="loading"/>
          <h2>You have no Pokemons yet!</h2>
        </div>
      }
      </Grid> 
    </div>
  )
}
