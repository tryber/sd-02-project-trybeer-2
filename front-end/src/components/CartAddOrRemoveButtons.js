import React, { useEffect, useState } from 'react';
import { ReactComponent as Add } from '../images/Add.svg';
import { ReactComponent as Remove } from '../images/Minus.svg';
import '../styles/CartAddOrRemoveButtons.css';

export default function CartAddOrRemoveButtons ({ product: {  id, name, price, urlImage } }) {
  const [itemQty, setItemQty] = useState(0);
  const [lastAction, setLastAction] = useState('null');

  // const sendToLocalStorage = (products) => localStorage.setItem('cart', JSON.stringify(products));

  // const updateItemQty = (currentCart) => sendToLocalStorage(currentCart.map((product) => {
  //   if(product.id === id) {
  //     return {  id, name, price, urlImage, itemQty }
  //   }
  //   return product;
  // }));

  // const refreshCart = () => {
  //   const currentCart = JSON.parse(localStorage.getItem('cart'));
  //   if(lastAction === 'add') return addProduct(currentCart);
  //   if(lastAction === 'remove') return removeProduct(currentCart);
  // }

  // const removeProduct = (currentCart) => {
  //   if (JSON.stringify(currentCart) === '[]') return localStorage.removeItem('cart');
  //   if(itemQty === 0) return sendToLocalStorage(currentCart.filter((item) => item.id !== id));
  //   return updateItemQty(currentCart)
  // }

  // const addProduct = (currentCart) => {
  //   if (currentCart) return updateItemQty(currentCart);
  //   return localStorage.setItem('cart', JSON.stringify([{  id, name, price, urlImage, itemQty }]));
  // }

  // useEffect (() => refreshCart(), [itemQty, refreshCart]);

  return (
    <div className="add-remove-btns-container">
      <div className="remove-btn-container">
        <button type="button" onClick={() => {
          setLastAction('remove');
          return itemQty > 0 && setItemQty((qty) => qty - 1)
        }}>
          <Remove className="remove-btn"/>
        </button>
      </div>
      <div className="item-qty-container">
        <span>{itemQty}</span>
      </div>
      <div className="add-btn-container">
        <button type="button" onClick={() => {
          setLastAction('add');
          setItemQty((qty) => qty + 1)
        }}>
          <Add className="add-btn"/>
        </button>
      </div>
    </div>
  )
}
