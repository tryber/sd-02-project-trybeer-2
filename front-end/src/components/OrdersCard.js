import React from 'react';
import history  from '../services/history';
import formatDateFunc from '../services/formatDateFunc';
import formatPriceFunc from '../services/formatPriceFunc';
import '../styles/OrdersCard.css'

const redirectToDetailsPage = (orderId) => {
  history.push(`/orders/${orderId}`)
}

const OrdersCard = ({ orders }) => {
  const formatedPrice = formatPriceFunc(orders.totalPrice);
  const formatedDate = formatDateFunc(orders.saleDate);

  return (
    <button
      type="button" className="order-card-container"
      onClick={() => redirectToDetailsPage(orders.saleId)}>
      <div className="order-card-top-content">
        <div className="order-card-text">{`Pedido ${orders.saleId}`}</div>
        <div className="order-card-text">{formatedDate}</div>
      </div>
      <div className="order-card-bot-content">
        <div className="order-card-text">{formatedPrice}</div>
      </div>
    </button>
  );
};

export default OrdersCard;
