import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/order/:id" component={OrderScreen} />
          <Route exact path="/shipping" component={ShippingScreen} />
          <Route exact path="/payment" component={PaymentScreen} />
          <Route exact path="/placeorder" component={PlaceOrderScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart/:id?" component={CartScreen} />
          <Route exact path="/admin/userlist" component={UserListScreen} />
          <Route
            exact
            path="/admin/productlist"
            component={ProductListScreen}
          />
          <Route exact path="/admin/orderlist" component={OrderListScreen} />
          <Route exact path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route
            exact
            path="/admin/product/:id/edit"
            component={ProductEditScreen}
          />
          <Route path="/search/:keyword" component={HomeScreen} />
          <Route exact path="/page/:pageNumber" component={HomeScreen} />
          <Route
            exact
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
          />
          <Route exact path="/" component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
