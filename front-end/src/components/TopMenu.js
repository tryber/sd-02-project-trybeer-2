import React, { useContext, useState, useEffect } from 'react';
import { TrybeerContext } from '../context/TrybeerContext'
import { ReactComponent as HamburgerMenu } from '../images/HamburgerMenu.svg';
import { useLocation } from 'react-router-dom';
import '../style/TopMenu.css';

export default function TopMenu () {
  const { sideMenu: [,,toggleSideMenu] } = useContext(TrybeerContext);
  const [headerTitle, setHeaderTitle] = useState('Trybeer');
  const [displayTopMenu, setDisplayTopMenu] = useState(true);

  const { pathname } = useLocation();

  useEffect(() => {
    setDisplayTopMenu(true);
    if(pathname) {
      if(pathname === '/login' || pathname === '/register') return setDisplayTopMenu(false)

      if(pathname === '/profile') setHeaderTitle('Meu perfil')
      else if(pathname === '/checkout') setHeaderTitle('Finalizar Pedido')
      else if(pathname === '/orders') setHeaderTitle('Meus Pedidos')
      else if(!!pathname.match(/orders\/[0-9]+/g)) setHeaderTitle('Detalhes de Pedido')
      else setHeaderTitle('TryBeer')
    }
  }, [pathname]);

  return (
    displayTopMenu &&
    <div className="top-menu-container">
      <div className="hamburger-menu-container">
        <button type="button" className="hamburguer-button" onClick={toggleSideMenu}>
          <HamburgerMenu className="hamburger-menu-icon" alt="Hamburguer Menu - Icons made by Kiranshastry@https://www.flaticon.com/authors/kiranshastry"/>
        </button>
      </div>
      <div className="title-container">
        <h1 className="header-title">{headerTitle}</h1>
      </div>
      <div className="space-div"></div>
    </div>
  )
}

//<div>Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>