import Immutable from 'immutable'

// TODO: create clear API
export default function localStorageEnhancer (config) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    let persistedState

    try {
      const serializedState = window.localStorage.getItem('shoppingCartApp')

      if (serializedState === null) {
        persistedState = undefined
      } else {
        persistedState = JSON.parse(window.localStorage.getItem('shoppingCartApp'))
      }
    } catch (e) {
      persistedState = undefined
    }

    const store = createStore(reducer, Immutable.fromJS(persistedState), enhancer)

    // TODO: add throttle
    store.subscribe(() => {
      try {
        window
        .localStorage
        .setItem('shoppingCartApp', JSON.stringify({
          cart: {
            data: store.getState().getIn(['cart', 'data']).toJS(),
            sorting: {},
            status: ''
          }
        }))
      } catch (e) {
        console.log('Error during saving to localStorage')
      }
    })

    return store
  }
}
