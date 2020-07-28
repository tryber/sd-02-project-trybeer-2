import React, { useEffect, useState } from 'react';
import axios from 'axios';

const productsRequest = async () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
    const productData = await axios({
    baseURL: `http://localhost:3001/products`,
    method: 'get',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': token }
  })
  .catch(({ response: { status, data: { error: { message }}} }) => console.log(`Error: ${status}. ${message}`));

  return console.log(productData);
};

export default function ClientProducts () {
<<<<<<< HEAD
  const [productData, setProductData] = useState([])

  useEffect(() => {
    const productsRequest = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
        const productData = await axios({
        baseURL: `http://localhost:3001/products`,
        method: 'get',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': token }
      })
      .catch(({ response: { status, data: { error: { message }}} }) => console.log(`Error: ${status}. ${message}`));

      return console.log(productData);
    };
    productsRequest()
    }, [])
  return <div>Produtos Cliente</div>
=======
  return (
    <div>
      <div>Produtos Cliente</div>
    </div>
  )
>>>>>>> mateus-cliente-menu-superior
}