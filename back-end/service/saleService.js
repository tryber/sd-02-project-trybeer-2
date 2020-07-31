const saleModel = require('../model/saleModel');
const productModel = require('../model/productModel');

const createSale = async (sale, userId, name) => {
  const { products: quantities, deliveryAddress, deliveryNumber } = sale;
  const productIds = quantities.map(({ productId }) => productId);
  const products = await productModel.getProductsByIds(productIds);

  if (products.some((elem) => elem === null)) {
    return { error: true, message: 'Some products can not be found', code: 'invalid_data' };
  }

  const totalPrice = products.reduce((total, product) => {
    const productQuantity = quantities.find((quantity) => quantity.productId === product.id);
    return total + (productQuantity.quantity * product.price);
  }, 0);

  const saleDate = new Date().toISOString().replace('T', ' ').substring(0, 19);

  const mountedSale = { userId, totalPrice, deliveryAddress, deliveryNumber, saleDate };
  const newSale = await saleModel.createSale(mountedSale);
  await quantities.forEach(async ({ productId, quantity }) =>
    saleModel.createSaleProducts(newSale.id, productId, quantity));

  return { user: name, saleId: newSale.id, date: saleDate, total: totalPrice };
};

module.exports = {
  createSale,
};
