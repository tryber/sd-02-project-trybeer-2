import React from 'react';
import { Link } from 'react-router-dom'
import '../../styles/OrdersCard.css'
import formatDateFunc from '../../services/formatDateFunc';
import formatPriceFunc from '../../services/formatPriceFunc';

export default function OrderCard ({ orders }) {
  const formatedPrice = formatPriceFunc(orders.totalPrice);
  const formatedDate = formatDateFunc(orders.saleDate);

  return (
    <Link
    to={`/admin/orders/${orders.saleId}`} className="order-card-container"
    >
      <div className="order-card-top-content">
        <div className="order-card-text">{`Pedido ${orders.saleId}`}</div>
        <div className="order-card-text">{formatedDate}</div>
      </div>
      <div className="order-card-bot-content">
        <div className="order-card-text">{formatedPrice}</div>
      </div>
      <div className="order-card-status-content">
        <span className="order-card-status">{orders.status}</span>
      </div>
    </Link>
  );
};