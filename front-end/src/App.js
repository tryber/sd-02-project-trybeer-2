import React, { useEffect } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import AdminHome from './pages/admin/Home'
import ClientProducts from './pages/client/Products';
import history from './services/history';
import './App.css';

function App() {
  useEffect(() => <Redirect to="/login" />);
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
