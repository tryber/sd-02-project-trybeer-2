import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminHome from './pages/admin/Home'
import ClientProducts from './pages/client/Products';
import history from './services/history';
import Checkout from './pages/client/Checkout';
import TopMenu from './components/TopMenu';
import ClientSideBar from './components/client/ClientSideBar';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/client/Profile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <TopMenu />
        <ClientSideBar />
        <Switch>
          <Route exact path="/admin/profile" component={AdminHome} />
          <Route exact path="/products" component={ClientProducts} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/" render={() => history.push('/login')} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
