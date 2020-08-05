import React, { useState, useEffect } from 'react';
import history from '../../services/history';
import axios from 'axios';
import checkLogin from '../../services/checkLogin';
import { getStatusColor } from '../../components/admin/OrderCard'
import formatPriceFunc from '../../services/formatPriceFunc';
import '../../styles/AdminOrderDetails.css';

export default function AdminOrdersDetails() {
  const [orderDetails, setOrderDetails] = useState([{ totalPrice: 0, status: 'Pendente', saleId: 0 }]);


  const { totalPrice, status, saleId } = orderDetails && orderDetails[0];
  const thisOrderID = Number(history.location.pathname.match(/[0-9]+/g));

  useEffect(() => {
    const token = checkLogin();

    const getOrderDetails = async () => {
      const detailsData = await axios({
        method: 'get',
        baseURL: `http://localhost:3001/sales/${thisOrderID}`,
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': token }
      })
      .catch(({ response: { status }}) => {
        return status === 401 && history.push('/login')
      } );
      return detailsData && setOrderDetails(detailsData.data);
    }
    getOrderDetails();
  }, [thisOrderID]);

  return (
    <div className="admin-orders-details-container">
      <div className="orders-details-header">
        <span data-testid="order-number">{`Pedido ${saleId} - `}</span>
        <span data-testid="order-status" style={getStatusColor(status)}>{status}</span>
      </div>
      <div className="products-container">
        <ul className="products-unordered-list">
          {orderDetails && orderDetails.map(({ quantity, name, totalPrice, price }, index) => (
            <li className="product-list-item" key={`${name}_${index + 1}`}>
              <div className="product-main-info">
                <span data-testid={`${index}-product-qtd`}>{`${quantity} - `}</span>
                <span data-testid={`${index}-product-name`}>{`${name}`}</span>
              </div>
              <div className="product-price-info">
                <span data-testid={`${index}-product-total-value`}>{`${formatPriceFunc(totalPrice)}`}</span>
                <span className="product-unitary-price">{`  (${formatPriceFunc(price)})`}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="total-value-container">
            <span data-testid="order-total-value" className="order-total-value">
              {`Total: ${formatPriceFunc(totalPrice)}`}
            </span>
        </div>
      </div>
    </div>
  )
}