import data from '../data/products.json'

const shoppingCartService = {
  getData: () => {
    return Promise.resolve(data);
  },
  sendData: () => {}
};

export default shoppingCartService;
