import React, { useEffect, useState } from 'react';
import CartAddOrRemoveButtons from './CartAddOrRemoveButtons.js'
import '../styles/ProductCard.css';

export default function ProductCard ({ product: {  id, name, price, urlImage } }) {
  return (
    <div className="product-card-container">
      <div className="image-container">
        <img className="product-image" src={urlImage} alt={`Foto do produto: ${name}`} />
      </div>
      <div className="content-container">
        <div className="product-name-container">
          <h5>{name}</h5>
        </div>
        <div className="product-price-container">
          <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}</span>
        </div>
        <div className="add-remove-btns-container">
          <CartAddOrRemoveButtons product={ { id, name, price, urlImage } } />
        </div>
      </div>
    </div>
  )
}