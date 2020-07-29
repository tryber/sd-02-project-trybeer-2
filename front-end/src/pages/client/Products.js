import React, { useEffect, useState, useContext } from 'react';
import ProductCard from '../../components/ProductCard';
import { TrybeerContext } from '../../context/TrybeerContext'
import axios from 'axios';
import '../../styles/Products.css';

export default function ClientProducts () {
  const [productData, setProductData] = useState([])
  const [errorStatus, setErrorStatus] = useState('');
  const { shopCart: [totalPrice, setTotalPrice] } = useContext(TrybeerContext)

  const refreshTotalPrice = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart'));
    const cartTotalPrice = currentCart.reduce((total, { totalValue }) => total + totalValue, 0);
    setTotalPrice(cartTotalPrice);
  }

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
    refreshTotalPrice();
    }, [])

  return (
    <div className="products-page">
      <div className="status-report-div">
        <span>{errorStatus}</span>
      </div>
      <div className="products-container">
        {productData && productData.map((product) => (
          <div className="product-card" key={product.id}><ProductCard product={product} /></div>))}
      </div>
    </div>
  )
}