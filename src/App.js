import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Pages/Home'
import Detail from './Pages/Detail'
import DetailRelease from './Pages/DetailRelease'
import MyList from './Pages/MyList'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {myListPokemons} from './Cache'
import BottomNavigation from './Components/BottomNavigation'
import Navbar from './Components/Navbar'
import {GlobalProvider} from './Context/GlobalState'

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          myPokemons: {
            read(){
              return myListPokemons()
            }
          }
        }
      }
    }
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/detail/:name" component={Detail}/>
              <Route exact path="/detail-release/:name" component={DetailRelease}/>
              <Route exact path="/list" component={MyList}/>
            </Switch>
            <BottomNavigation />
          </div>
        </Router>
      </GlobalProvider>
    </ApolloProvider>
  );
}

export default App;
