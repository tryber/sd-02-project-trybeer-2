import React from 'react';
import OrdersCard from '../../components/OrdersCard';

const orders = [
  {
    orderNumber: '001',
    orderDate: '28/01',
    orderTotalPrice: '340'
  },
  {
    orderNumber: '002',
    orderDate: '29/01',
    orderTotalPrice: '250'
  },
  {
    orderNumber: '003',
    orderDate: '30/01',
    orderTotalPrice: '5000'
  },
  {
    orderNumber: '004',
    orderDate: '31/01',
    orderTotalPrice: '12'
  },
];

const Orders = () => {
  return (
    <div className='orders-container'>
      {orders.map((orders)=> <OrdersCard key={orders.orderNumber} orders={orders} />)}
    </div>
  )
};

export default Orders;
