import React, { useEffect, useState } from 'react';
import '../../styles/Checkout.css';

const formatPrice = (totalPrice) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice);


export default function Checkout() {
  const [cartData, setCartData] = useState([]);

  const removeItem = (itemId) => {
    const actualCart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : null;
    if(actualCart !== null) {
      const newCart = actualCart.filter(({ id }) => id !== itemId)
      console.log(String(newCart));
      if (String(newCart) === '') {
        localStorage.removeItem('cart');
        return setCartData(null)
      }
      localStorage.removeItem('cart');
      localStorage.setItem('cart', JSON.stringify(newCart));
      return setCartData(newCart);
    }
    return setCartData(null);
  }

  useEffect(() => {
    const getAddressInfoFromLocalStorage = () => JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : null;
    const actualCart = getAddressInfoFromLocalStorage();
    if(!actualCart || actualCart.length === 0) {
      setCartData(null);
      localStorage.removeItem('cart');
    }
    setCartData(getAddressInfoFromLocalStorage());
  }, [setCartData]);

  return (
    <div className="checkout-page-container">
      <div className="checkout-products-container">
        <div className="products-header-container">
          <h3>Produtos</h3>
        </div>
        <div className="products-list-container">
          <ul>
            {cartData ? cartData.map(({ id, itemQty, name, price, totalValue }, index) => (
              <li key={name} className="product-item">
                <span data-testid={`${index}-product-qtd-input`} className="span-itemQty">{itemQty}</span>
                <span data-testid={`${index}-product-name`}>{`- ${name}`}</span>
                <span className="spacing-span"></span>
                <span className="span-total-product-price" data-testid={`${index}-product-total-value`}>{`${formatPrice(totalValue)}`}</span>
                <span className="span-unit-price">{`(${formatPrice(price)} un)`}</span>
                <button className="item-removal-button" onClick={() => removeItem(id)}>X</button>
              </li>
            )) : <h2>Não há produtos no carrinho</h2>}
          </ul>
        </div>
        <div className="total-price-container">

        </div>
      </div>
      <div className="address-form-container" >
        <div className="address-header-container">
          <h3>Endereço</h3>
        </div>
        <form className="address-form">
          <label htmlFor="checkout-street-input">
            Rua:
            <input type="text" data-testid="checkout-street-input" id="checkout-street-input" />
          </label>
          <label htmlFor="checkout-house-number-input">
            Número da casa:
            <input type="text" data-testid="checkout-house-number-input" id="checkout-house-number-input" />
          </label>
          <button data-testid="checkout-finish-btn" id="checkout-finish-btn">Finalizar Pedido</button>
        </form>
      </div>
    </div>
  );
}
