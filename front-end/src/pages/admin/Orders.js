import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../../components/admin/OrderCard'
import history  from '../../services/history';

export default function AdminOrders () {
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const { token } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if(!token) return history.push('/login');

    const getOrders = async () => {
      const { data } = await axios({
        baseURL: 'http://localhost:3001/sales',
        method: 'get',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': token }
      })
      .catch((err) => console.error(err));
      return setOrdersData(data);
    }

    getOrders()
  }, []);
  console.log(ordersData)
  return (
    <div>
      {ordersData.length !== 0 && ordersData.map((order) => <OrderCard key={order.saleId} orders={order} />)}
    </div>
  )
}