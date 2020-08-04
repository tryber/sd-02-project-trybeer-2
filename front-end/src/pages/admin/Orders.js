import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../../components/admin/OrderCard'
import history  from '../../services/history';
import '../../styles/AdminOrders.css'

export default function AdminOrders () {
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const { token } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if(!token) return history.push('/login');

    const getOrders = async () => {
      const ordersData = await axios({
        baseURL: 'http://localhost:3001/sales',
        method: 'get',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': token }
      })
      .catch(({ response: { status }}) => {
        return status === 401 && history.push('/login')
      } );
      return ordersData && setOrdersData(ordersData.data);
    }

    getOrders()
  }, []);

  return (
    <div>
      {ordersData && ordersData.length !== 0 && ordersData.map((order) => (
        <div className="admin-orders-container">
          <div className="admin-orders-card"><OrderCard key={order.saleId} orders={order} /></div>
        </div>
      ))}
    </div>
  )
}