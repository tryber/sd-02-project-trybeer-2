import React, { useContext } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminHome from './pages/admin/Home'
import ClientHome from './pages/client/Home';
import history from './services/history';
import { TrybeerContext } from './context/TrybeerContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/admin/home" component={AdminHome} />
          <Route path="/client/home" component={ClientHome} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
