import React, { useEffect, useContext } from 'react';
import history from '../services/history';

const SideBar = () => {
  useEffect(() => {

  });
  return (
    <div>
      <button data-testid="side-menu-item-products">Produtos</button>
      <button data-testid="side-menu-item-my-orders">Meus Pedidos</button>
      <button data-testid="side-menu-item-my-profile">Meu Perfil</button>
      <button data-testid="side-menu-item-logout" onClick={() => history.push('/login')}>Sair</button>
    </div>
  )
};

export default SideBar;
