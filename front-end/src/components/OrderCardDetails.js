import React from 'react';
import formatDateFunc from '../services/formatDateFunc';
import formatPriceFunc from '../services/formatPriceFunc';
import '../styles/OrderCardDetails.css';

const sale = [
  {
    orderNumber: '001',
    orderDate: '2020-01-28T22:22:22',
    orderTotalPrice: '340',
    products: [
      {
        id: '3',
        name: "skol",
        price: "24",
      },
      {
        id: '2',
        name: "brahma",
        price: "35",
      },
      {
        id: '2',
        name: "brahma",
        price: "24",
      },
      {
        id: '1',
        name: "original",
        price: "44.3",
      },
    ]
  },
];

const showSaleProducts = (products) => (
  products.map(({ id, name, price }) =>
    <div className="card-details-mid-container">
      <div>
        {`${id} - ${name}`}
      </div>
      <div>
        {formatPriceFunc(price)}
      </div>
    </div>
  )
);

const OrderCardDetails = ({ id: { orderId } }) => {
  const formatedDate = formatDateFunc(sale[0].orderDate);
  return (
    <div className="card-details-container">
      <div className="card-details-top-container">
        <div>{`Pedido ${orderId}`}</div>
        <div>{formatedDate}</div>
      </div>
      {showSaleProducts(sale[0].products)}
      <div className="card-details-bot-container">
        {`Total: ${formatPriceFunc(sale[0].orderTotalPrice)}`}
      </div>
    </div>
  )
};

export default OrderCardDetails;
