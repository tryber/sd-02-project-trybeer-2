import React, { useContext } from 'react';
import { TrybeerContext } from '../context/TrybeerContext'
import history from '../services/history';
import '../styles/CheckoutButton.css';

export default function CheckoutButton () {
  const { shopCart: [totalPrice] } = useContext(TrybeerContext)

  return (
    <div className="checkout-bottom-btn-container">
      <button
        type="button"
        data-testid="checkout-bottom-btn"
        className="checkout-bottom-btn"
        onClick={(()=> history.push('/checkout'))}
        disabled={!totalPrice}>
        <div className="cart-link-container">
          Ver Carrinho
          <div className="total-qty-span-container">
            <span className="total-qty-span" data-testid="checkout-bottom-btn-value">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
            </span>
          </div>
        </div>
      </button>
    </div>
  )
}