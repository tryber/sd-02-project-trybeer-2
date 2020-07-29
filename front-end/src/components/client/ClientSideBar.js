import React, { useEffect, useContext } from 'react';
import { TrybeerContext } from '../../context/TrybeerContext';
import history from '../../services/history';

import '../../style/ClientSideBar.css';

const redirectButton = (setShowSideMenu, route) => {
  setShowSideMenu(false);
  history.push(`${route}`)
};


const SideBar = () => {
  const { sideMenu: [showSideMenu, setShowSideMenu] } = useContext(TrybeerContext);
  return (!showSideMenu) || (
    <div className="side-menu-container">
      <div className="side-menu-top-container">
        <button data-testid="side-menu-item-products">Produtos</button>
        <button data-testid="side-menu-item-my-orders">Meus Pedidos</button>
        <button data-testid="side-menu-item-my-profile">Meu Perfil</button>
      </div>
      <div className="side-menu-bot-container">
        <button data-testid="side-menu-item-logout" onClick={() => redirectButton(setShowSideMenu, '/login')}>
          Sair
        </button>
      </div>
    </div>
  )
};

export default SideBar;
