import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import { TrybeerContext } from './context/TrybeerContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </div>
  );
}

export default App;
