import React from 'react';
import CartAddOrRemoveButtons from './CartAddOrRemoveButtons.js'
import '../styles/ProductCard.css';

export default function ProductCard ({ index, product: {  id, name, price, urlImage } }) {
  return (
    <div className="product-card-container">
      <div> </div>
      <div className="product-content-container">
        <div className="image-container">
          <img className="product-image" src={urlImage} alt={`Foto do produto: ${name}`} data-testid={`${index}-product-img`}/>
        </div>
        <div className="product-name-container">
          <span className="product-name" data-testid={`${index}-product-name`}>{name}</span>
        </div>
        <div className="add-remove-btns-container">
          <CartAddOrRemoveButtons product={ { id, name, price, urlImage } } index={index} />
        </div>
        <div> </div>
      </div>
      <div className="product-price-container">
        <span data-testid={`${index}-product-price`}>
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
        </span>
      </div>
    </div>
  )
}
