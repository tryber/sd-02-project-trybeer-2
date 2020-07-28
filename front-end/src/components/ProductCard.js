import React, { useEffect, useState } from 'react';
import '../styles/ProductCard.css';

export default function ProductCard ({ name, price, urlImage }) {
  return (
    <div className="product-card-container">
      <div className="image-container">

        <img src={urlImage} alt={`Foto do produto: ${name}`} />
      </div>
      <div className="content-container">
        <div className="product-name-container">
          <h5>{name}</h5>
        </div>
        <div className="product-price-container">
          <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}</span>
        </div>
        <div className="actual-quantity-container">

        </div>
        <div className="add-remove-btns-container">
        </div>
      </div>
    </div>
  )
}