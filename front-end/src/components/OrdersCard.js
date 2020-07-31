import React from 'react';
import '../style/OrdersCard.css'

const redirectToDetailsPage = () => {
  console.log('redirecionando');
}

const OrdersCard = ({ orders }) => {
  const formatedPrice = new Intl.NumberFormat(
    'pt-BR',
    { style: 'currency', currency: 'BRL' }
  ).format(orders.orderTotalPrice);
  return (
    <button type="button" className="order-card-container" onClick={redirectToDetailsPage}>
      <div className="order-card-top-content">
        <div className="order-card-text">{`Pedido ${orders.orderNumber}`}</div>
        <div className="order-card-text">{orders.orderDate}</div>
      </div>
      <div className="order-card-bot-content">
        <div className="order-card-text">{formatedPrice}</div>
      </div>
    </button>
  );
};

export default OrdersCard;
