import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const TrybeerContext = createContext();

export default function TrybeerProvider({ children }) {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [totalPrice, setTotalPrice] = useState([]);
  const [totalQty, setTotalQty] = useState(0);

  const toggleSideMenu = () => setShowSideMenu(!showSideMenu);
  const store = {
    sideMenu: [showSideMenu, setShowSideMenu, toggleSideMenu],
    shopCart: [totalPrice, setTotalPrice, totalQty, setTotalQty],
  };

  return <TrybeerContext.Provider value={store}>{children}</TrybeerContext.Provider>;
}

TrybeerProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
