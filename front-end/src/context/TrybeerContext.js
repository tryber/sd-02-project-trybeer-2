import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const TrybeerContext = createContext();

export default function TrybeerProvider({ children }) {


  const store = {
  };

  return <TrybeerContext.Provider value={store}>{children}</TrybeerContext.Provider>;
}

TrybeerProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
