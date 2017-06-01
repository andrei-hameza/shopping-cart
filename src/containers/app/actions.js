export const receiveData = data => (dispatch) => {
  dispatch({
    type: 'RECEIVE_DATA',
    payload: data
  })
}
