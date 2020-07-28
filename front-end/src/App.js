import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminHome from './pages/admin/Home'
import ClientProducts from './pages/client/Products';
import history from './services/history';
import Register from './pages/Register';
import TopMenu from './components/TopMenu';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <TopMenu />
        <Switch>
          <Route path="/admin/home" component={AdminHome} />
          <Route path="/client/products" component={ClientProducts} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" render={() => history.push('/login')} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
