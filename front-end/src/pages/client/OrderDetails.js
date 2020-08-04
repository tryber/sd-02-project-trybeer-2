import React, { useEffect } from 'react';
import history from '../../services/history';
import OrderCardDetails from '../../components/OrderCardDetails';

const OrderDetails = ({ match: { params: orderId } }) => {
  useEffect(() => {
    const isLSExist = JSON.parse(localStorage.getItem('user'));
    if (!isLSExist || !isLSExist.token) history.push('/login');
  }, []);
  return (
    <div>
      <OrderCardDetails id={orderId} />
    </div>
  );
};

export default OrderDetails;
