import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Cart from './containers/Cart/Cart';
import Products from './containers/Products/Products';
import Product from './containers/Products/Product/Product';
import Login from './containers/Auth/Login';
import Logout from './containers/Auth/Logout';
import Register from './containers/Auth/Register';
import Checkout from './containers/Checkout/Checkout';
import Payment from './containers/Checkout/Payment';
import Orders from './containers/Orders/Orders';
import Order from './containers/Orders/Order/Order';
import { connect } from 'react-redux';
import { fetchAllCategories, fetchAllBrands } from './store/actions/productActions';
import { checkAuthState } from './store/actions/authActions';
import { getCart } from './store/actions/cartActions';

class App extends Component {

  componentDidMount() {
    // Keep auth state
    this.props.onKeepSigninState();
    this.props.fetchAllCategories();
    this.props.fetchAllBrands();
    this.props.fetchCart();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/products" component={Products} />
        <Route path="/product/:id" exact component={Product} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout/shipping" component={Checkout} />
        <Route path="/checkout/payment" component={Payment} />
        <Route path="/orders" component={Orders} />
        <Route path="/order/:id" component={Order} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/products" component={Products} />
          <Route path="/product/:id" exact component={Product} />
          <Route path="/logout" component={Logout} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout/shipping" component={Checkout} />
          <Route path="/checkout/payment" component={Payment} />
          <Route path="/orders" component={Orders} />
          <Route path="/order/:id" component={Order} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null,
    isCartLoaded: state.cart.loaded
  };
};

const mapDispatchToProps = {
  onKeepSigninState: checkAuthState,
  fetchAllCategories: fetchAllCategories,
  fetchAllBrands: fetchAllBrands,
  fetchCart: getCart
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
