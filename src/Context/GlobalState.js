import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from './AppReducer'

const initialState = {
  mylist: [],
  limit: 12,
  offset: 0,
}

//create context
export const GlobalState = createContext(initialState)

export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, ()=> {
    const localData = localStorage.getItem('state');
    return localData ? JSON.parse(localData) : initialState
  })

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
  }, [state])

  const addDataPokemon = (pokemon) => {
    dispatch({
      type: 'ADD_MY_LIST',
      payload: pokemon
    })
  }

  const releaseDataPokemon = (id) => {
    dispatch({
      type: 'RELEASE_MY_LIST',
      payload: id
    })
  }

  const editDataPokemon = (pokemon) => {
    dispatch({
      type: 'UPDATE_LIST',
      payload: pokemon
    })
  }

  return (
    <GlobalState.Provider value={{
      mylist: state.mylist,
      addDataPokemon,
      releaseDataPokemon,
      editDataPokemon,
    }}>
      {children}
    </GlobalState.Provider>
  )
}