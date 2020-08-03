import React, { useEffect, useState, useContext } from 'react';
import { TrybeerContext } from '../../context/TrybeerContext'
import '../../styles/Checkout.css';

const formatPrice = (totalPrice) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice);


export default function Checkout() {
  const [cartData, setCartData] = useState([]);
  const [addressValue, setAdressValue] = useState('');
  const [streetNumber, setStreetNumber] = useState(0);
  const { shopCart: [totalPrice, setTotalPrice] } = useContext(TrybeerContext)

  const removeItem = (itemId) => {
    const actualCart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : null;
    if(actualCart !== null) {
      const newCart = actualCart.filter(({ id }) => id !== itemId)
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

  const interactiveFormField = (formName, label, type, formValidation) => (
    <label className="form-label" htmlFor={formName}>
      {label}
      <br />
      <input
        type={type}
        id={formName}
        className="form-field"
        data-testid={formName}
        onChange={(e) => formValidation(e.target.value)}/>
    </label>
  );


  useEffect(() => {
    const getAddressInfoFromLocalStorage = () => JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : null;
    const actualCart = getAddressInfoFromLocalStorage();
    if(!actualCart || actualCart.length === 0) {
      setCartData(null);
      localStorage.removeItem('cart');
    }
    setCartData(getAddressInfoFromLocalStorage());
  }, [setCartData]);

  useEffect(() => {
    const refreshTotalPrice = () => {
      const currentCart = JSON.parse(localStorage.getItem('cart'));
      const cartTotalPrice = currentCart ? currentCart.reduce((total, { totalValue }) => total + totalValue, 0) : 0;
      setTotalPrice(cartTotalPrice);
    }
     refreshTotalPrice()
  }, [setTotalPrice, cartData]);

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
          <span data-testid="order-total-value">{`Total: ${formatPrice(totalPrice)}`}</span>
        </div>
      </div>
      <div className="address-form-container" >
        <div className="address-header-container">
          <h3>Endereço</h3>
        </div>
        <form className="address-form">
          {interactiveFormField('checkout-street-input', 'Rua:', 'text', setAdressValue)}
          {interactiveFormField('checkout-house-number-input', 'Número da casa:', 'number', setStreetNumber)}
          <button
            type="button"
            data-testid="checkout-finish-btn"
            id="checkout-finish-btn"
            onClick={() => console.log(addressValue && streetNumber)}
            disabled={!(addressValue && streetNumber && totalPrice)}>
              Finalizar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}
