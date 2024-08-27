// /home/user/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import { Home } from './pages/Home';
import { Map } from './pages/Map';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Deals } from './pages/Deals';
import { StoreDetails } from './pages/StoreDetails';
import { Checkout } from './pages/Checkout';
import { UserProfile } from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/map" component={Map} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/deals" component={Deals} />
        <Route path="/store/:storeId" component={StoreDetails} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/profile" component={UserProfile} />
      </Switch>
    </Router>
  );
}

export default App;