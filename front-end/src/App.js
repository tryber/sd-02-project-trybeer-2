import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminHome from './pages/admin/Home'
import ClientProducts from './pages/client/Products';
import history from './services/history';
import TopMenu from './components/TopMenu';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/client/Orders';
import OrdersDetails from './pages/client/OrderDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <TopMenu />
        <Switch>
          <Route exact path="/admin/profile" component={AdminHome} />
          <Route exact path="/products" component={ClientProducts} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/orders" component={OrdersPage} />
          <Route exact path="/orders/:orderId" component={OrdersDetails} />
          <Route exact path="/" render={() => history.push('/login')} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
