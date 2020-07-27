import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import { TrybeerContext } from './context/TrybeerContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
