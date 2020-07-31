import React from 'react';
import history  from '../services/history';
import '../style/OrdersCard.css'
import formatDateFunc from '../services/formatDateFunc';
import formatPriceFunc from '../services/formatPriceFunc';

const redirectToDetailsPage = (orderId) => {
  history.push(`/orders/${orderId}`)
}

const OrdersCard = ({ orders }) => {
  const formatedPrice = formatPriceFunc(orders.orderTotalPrice);
  const formatedDate = formatDateFunc(orders.orderDate);

  return (
    <button
      type="button" className="order-card-container"
      onClick={() => redirectToDetailsPage(orders.orderNumber)}>
      <div className="order-card-top-content">
        <div className="order-card-text">{`Pedido ${orders.orderNumber}`}</div>
        <div className="order-card-text">{formatedDate}</div>
      </div>
      <div className="order-card-bot-content">
        <div className="order-card-text">{formatedPrice}</div>
      </div>
    </button>
  );
};

export default OrdersCard;
