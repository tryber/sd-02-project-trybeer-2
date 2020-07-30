import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminHome from './pages/admin/Home'
import ClientProducts from './pages/client/Products';
import history from './services/history';
import Checkout from './pages/client/Checkout';
import TopMenu from './components/TopMenu';
import RegisterPage from './pages/RegisterPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <TopMenu />
        <Switch>
          <Route path="/admin/profile" component={AdminHome} />
          <Route path="/products" component={ClientProducts} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/" render={() => history.push('/login')} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
