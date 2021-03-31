export default (state, action) => {
  switch (action.type) {
    case 'ADD_LIMIT':
      return {...state, limit : state.limit + action.payload}
    case 'GET_POKEMONS':
      return {...state, pokemons : action.payload}
    case 'ADD_MY_LIST':
      return {...state, mylist: state.mylist.concat(action.payload)}
    case 'UPDATE_LIST':
      console.log('reducer',action.payload)
      let cloneList = [...state.mylist]
      let resultList = []
      for (let i = 0; i < cloneList.length; i++) {
        let item = cloneList[i];
        if(item.id == action.payload.id){
          resultList.push(action.payload)
        } else {
          resultList.push(item)
        }
      }
      return {...state, mylist : resultList}
    case 'RELEASE_MY_LIST':
      return {...state, mylist: state.mylist.filter(pokemon => pokemon.id !== action.payload)}
    default:
      return state;
  }
}