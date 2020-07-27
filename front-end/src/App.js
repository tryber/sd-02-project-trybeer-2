import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminHome from './pages/admin/Home'
import ClientProducts from './pages/client/Products';
import history from './services/history';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/admin/home" component={AdminHome} />
          <Route path="/client/products" component={ClientProducts} />
          <Route path="/login" component={Login} />
          <Route path="/" render={() => history.push('/login')} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
