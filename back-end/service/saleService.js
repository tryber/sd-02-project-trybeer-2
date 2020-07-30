const saleModel = require('../model/saleModel');
const productModel = require('../model/productModel');

const createSale = async (sale, userId) => {
  const { products: quantities } = sale;
  const productIds = quantities.map(({ productId }) => productId);
  const products = await productModel.getProductsByIds(productIds);

  if (products.some((elem) => elem === null)) {
    return { error: true, message: 'Some products can not be found', code: 'invalid_data' };
  }

  const totalPrice = products.reduce((total, product) => {
    const productQuantity = quantities.find((quantity) => quantity.productId === product.id);
    return total + (productQuantity.quantity * product.price);
  }, 0);
  return {};
};

module.exports = {
  createSale,
};
