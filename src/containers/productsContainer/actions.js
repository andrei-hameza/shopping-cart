import { productsActionTypes } from '../../constants/actionTypes'

/**
 * Sets products data
 * @param  {Object[]} data - Products data to dispatch
 * @return {Function}
 */

export const receiveData = data => (dispatch) => {
  dispatch({
    type: productsActionTypes.SET_DATA,
    payload: data
  })
}
