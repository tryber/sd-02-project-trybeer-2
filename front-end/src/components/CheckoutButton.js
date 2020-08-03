import React, { useContext } from 'react';
import { TrybeerContext } from '../context/TrybeerContext'
import { Link } from 'react-router-dom'
import '../styles/CheckoutButton.css';

export default function CheckoutButton () {
  const { shopCart: [totalPrice] } = useContext(TrybeerContext)

  return (
    <div className="checkout-bottom-btn-container">
      <button type="button" data-testid="checkout-bottom-btn" className="checkout-bottom-btn">
        <div className="cart-link-container">
          <Link to="checkout" className="cart-link">Ver Carrinho</Link>
        </div>
        <div className="total-qty-span-container">
          <span className="total-qty-span" data-testid="checkout-bottom-btn-value">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
          </span>
        </div>
      </button>
    </div>
  )
}