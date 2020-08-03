import React from 'react';
import formatDateFunc from '../services/formatDateFunc';
import formatPriceFunc from '../services/formatPriceFunc';
import '../style/OrderCardDetails.css';

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
  products.map(({ name, price, quantity }) =>
    <div key={name} className="card-details-mid-container">
      <div>
        {`${quantity} - ${name}`}
      </div>
      <div>
        {formatPriceFunc(quantity * price)}
      </div>
    </div>
  )
);

const OrderCardDetails = ({ data, id }) => {
  const formatedDate = formatDateFunc(data[0].saleDate);
  return (
    <div className="card-details-container">
      <div className="card-details-top-container">
        <div>{`Pedido ${id}`}</div>
        <div>{formatedDate}</div>
      </div>
      {showSaleProducts(data)}
      <div className="card-details-bot-container">
        {`Total: ${formatPriceFunc(data[0].totalPrice)}`}
      </div>
    </div>
  )
};

export default OrderCardDetails;
