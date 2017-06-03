import { productsActionTypes } from '../../constants/actionTypes'

export const receiveData = data => (dispatch) => {
  dispatch({
    type: productsActionTypes.SET_DATA,
    payload: data
  })
}
