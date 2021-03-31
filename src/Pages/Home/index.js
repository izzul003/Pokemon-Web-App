import React, { useState, useEffect} from 'react';
import './Home.css';
import {useQuery} from '@apollo/client';
import {GET_POKEMONS} from '../../Queries';
import Card from '../../Components/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import gifLoading from '../../Images/loading.gif'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    marginTop: 30
  },
  paddingLeft: {
    paddingLeft: 20
  },
  hovered: {
    marginBottom: 20,
    '&:hover': {
      marginBottom: 10,
      marginTop: 10,
      transition: '500ms'
    }
  }
}));

export default function Home() {
  const classes = useStyles();
  const [limit, setLimit] = useState(12)
  const [load, setLoad] = useState(false)
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: {
      limit: 200,
      offset: 0
    },
  });

  useEffect(() => {
    if (loading) {
      setLoad(true)
    }
  }, [loading])

  useEffect(() => {
    if (data) {
      setLoad(false)
    }
  }, [data])

  useEffect(() => {
    if (error) {
      <div className="container">
        <strong>Error...</strong>
        {JSON.stringify(error)}
      </div>
    }
  }, [error])

  const handleLoadData = ()=> {
    setLoad(true)
    setTimeout(()=>{
      setLimit(limit + 12)
      setLoad(false)
    },2000)
  }

  return (
    <div className={classes.root}>
      <Grid container 
      spacing={3} 
      direction="row"
      justify="center"
      alignItems="center"
      style={{margin: 'auto', width: '100%'}}
      >
          {data && data.pokemons.results.map((pokemon,idx)=>{
            if(idx < limit){
            return (<Grid item lg={2} sm={6} xs={6} classes={{root: classes.hovered}}>
                <Card key={idx} pokemon={pokemon} />
            </Grid>)
            }
          })}
      </Grid>
      {
        load ? 
        <div className="button-load-more">
          <img src={gifLoading} alt="loading"></img>
          <br />
          <strong>Loading...</strong>
        </div> :
        <div className="button-load-more">
        <Button variant="contained" data-testid="button-load-more" color="primary" onClick={()=>{handleLoadData()}} >
          <AddCircleOutlineIcon /> &nbsp;
          Load More
          </Button>
       </div> }
    </div>
  )
}