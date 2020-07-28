import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
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
  const [productData, setProductData] = useState([])
  const [errorStatus, setErrorStatus] = useState('');

  useEffect(() => {
    const productsRequest = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
        const { data } = await axios({
        baseURL: `http://localhost:3001/products`,
        method: 'get',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': token }
      })
      .catch(({ response: { status, data: { error: { message }}} }) => setErrorStatus(`Error: ${status}. ${message}`));
      return setProductData(data);
    };
    productsRequest();
    }, [])

  return (
    <div className="products-page">
      <div className="status-report-div">
        <span>{errorStatus}</span>
      </div>
      <div className="products-container">
        {productData && productData.map((product) => (
          <div className="product-card" key={product.id}>{ProductCard(product)}</div>))}
      </div>
    </div>
  )
}