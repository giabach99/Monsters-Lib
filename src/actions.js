import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_MONSTERS_PENDING,
    REQUEST_MONSTERS_SUCCESS,
    REQUEST_MONSTERS_FAILED } from "./constants"

export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
})

export const requestMonsters = () => (dispatch) => {
    dispatch({type: REQUEST_MONSTERS_PENDING});
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => dispatch({type: REQUEST_MONSTERS_SUCCESS, payload: data}))
      .catch(error => dispatch({type: REQUEST_MONSTERS_FAILED, payload: error}))
}