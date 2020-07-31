const connection = require('./connection');

const createSale = async (sale, status = 'Pendente') => {
  const { userId, totalPrice, deliveryAddress, deliveryNumber, saleDate } = sale;
  const session = await connection();
  const id = await session.sql(
    `INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status)
    VALUES (?, ?, ?, ?, ?, ?);`,
  )
    .bind(userId)
    .bind(totalPrice)
    .bind(deliveryAddress)
    .bind(deliveryNumber)
    .bind(saleDate)
    .bind(status)
    .execute()
    .then((result) => result.getAutoIncrementValue());
  return { id };
};

const createSaleProducts = async (saleId, productId, quantity) => {
  const session = await connection();
  await session.sql(
    `INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`,
  )
    .bind(saleId)
    .bind(productId)
    .bind(quantity)
    .execute();
};

const getSalesByUserId = async (param) => {
  const session = await connection();
  const result = await session.sql(
    `SELECT id, total_price, sale_date
    FROM sales
    WHERE user_id = ?;`,
  )
    .bind(param)
    .execute()
    .then((results) => results.fetchAll())
    .then((sales) => sales.map(
      ([id, totalPrice, saleDate]) =>
        ({ saleId: id, totalPrice, saleDate }),
    ));
  if (!result.length) return null;
  return result;
};

const getAllSales = async () => {
  const session = await connection();
  const result = await session.sql(
    `SELECT id, total_price, delivery_address, delivery_number, status
    FROM sales;`,
  )
    .execute()
    .then((results) => results.fetchAll())
    .then((sales) => sales.map(
      ([id, totalPrice, deliveryAddress, deliveryNumber, status]) =>
        ({ saleId: id, totalPrice, deliveryAddress, deliveryNumber, status }),
    ));
  return result;
};

module.exports = {
  createSale,
  createSaleProducts,
  getSalesByUserId,
  getAllSales,
};
