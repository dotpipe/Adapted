// /components/web/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './Home';
import Map from './Map';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';
import Deals from './Deals';
import StoreDetails from './StoreDetails';
import Checkout from './Checkout';
import UserProfile from './UserProfile';

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