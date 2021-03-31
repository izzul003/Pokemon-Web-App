import React, {useContext, useState, useEffect} from 'react';
import {GlobalState} from '../Context/GlobalState'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  media: {
    height: 155,
    width: 155
  },
  cardCatch: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonType: {
    borderRadius: 50,
    padding: 7,
    backgroundColor: '#ffcc5c'
  },
});

export default function MediaCard({pokemon}) {
  const history = useHistory();
  const classes = useStyles();
  const [indexes, setIndexes] = useState([])
  const {mylist} = useContext(GlobalState)

  useEffect(() => {
    let findAll = mylist.reduce(function(a, e, i) {
      if (e.name === pokemon.name)
          a.push(i);
      return a;
    }, []);
    setIndexes(findAll)
  }, [indexes])

  const handleClickDetail = (name) => {
    history.push('/detail/'+name) 
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={()=> {handleClickDetail(pokemon.name)}} >
        <CardMedia
          className={classes.media}
          image={pokemon.image}
          title={pokemon.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {pokemon.name}
          </Typography>
          <ButtonBase classes={{root: classes.buttonType}} disabled><Typography variant="caption"><strong>OWNED : {indexes.length}</strong></Typography></ButtonBase>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}