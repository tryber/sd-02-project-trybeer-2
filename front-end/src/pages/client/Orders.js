import React, { useEffect } from 'react';
import history from '../../services/history';
import OrdersCard from '../../components/OrdersCard';

const orders = [
  {
    orderNumber: '001',
    orderDate: '2020-01-28T22:22:22',
    orderTotalPrice: '340'
  },
  {
    orderNumber: '002',
    orderDate: '2020-01-29T22:22:22',
    orderTotalPrice: '250'
  },
  {
    orderNumber: '003',
    orderDate: '2020-01-30T22:22:22',
    orderTotalPrice: '5000'
  },
  {
    orderNumber: '004',
    orderDate: '2020-01-31T22:22:22',
    orderTotalPrice: '12'
  },
];

const Orders = () => {
  useEffect(() => {
    const isLSExist = JSON.parse(localStorage.getItem('user'));
    if (!isLSExist || !isLSExist.token) history.push('/login');
  }, []);
  return (
    <div className='orders-container'>
      {orders.map((orders)=> <OrdersCard key={orders.orderNumber} orders={orders} />)}
    </div>
  )
};

export default Orders;
