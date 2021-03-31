import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import { useHistory } from "react-router-dom";
import release from '../Images/release.png'

const useStyles = makeStyles({
  root: {
    maxWidth: 165,
  },
  media: {
    height: 155,
    width: 155
  },
  cardCatch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonType: {
    borderRadius: 50,
    padding: 12,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#ffcc5c'
  },
});

export default function MediaCard({pokemon, handleRelease}) {
  const history = useHistory();
  const classes = useStyles();

  const handleClickDetail = (name) => {
    history.push('/detail-release/'+name, {id: pokemon.id, data: pokemon.data})
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
        </CardContent>
      </CardActionArea>
      <CardActions classes={{root: classes.cardCatch}} onClick={()=>{handleRelease(pokemon.id)}} >
        <Button size="small" color="primary" variant="contained">
        <img src={release} style={{height: 20}} /> &nbsp;
          <strong>Release</strong>
        </Button>
      </CardActions>
    </Card>
  );
}