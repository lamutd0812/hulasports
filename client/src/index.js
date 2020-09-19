import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productReducers from './store/reducers/productReducers';
import authReducers from './store/reducers/authReducers';
import cartReducers from './store/reducers/cartReducers';
import orderReducers from './store/reducers/orderReducers';
import checkoutReducer from './store/reducers/checkoutReducers';

//setup redux devtools;
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  products: productReducers,
  auth: authReducers,
  cart: cartReducers,
  checkout: checkoutReducer,
  orders: orderReducers
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
