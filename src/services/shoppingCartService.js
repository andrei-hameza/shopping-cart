import data from '../data/products.json'

const shoppingCartService = {
  getData: () => {
    return Promise.resolve(data)
  },
  sendData: (products) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000)
    })
  }
}

export default shoppingCartService
