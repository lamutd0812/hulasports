import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/utility';

const initialState = {
    cartItems: [],
    totalPrice: 0,
    error: null
};

const getCart = (state, action) => {
    return updateObject(state, {
        cartItems: action.cartItems,
        totalPrice: action.totalPrice,
        error: null
    });
};


const getCartError = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};


const cartReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CART: return getCart(state, action);
        case actionTypes.ADD_TO_CART: return getCart(state, action);
        case actionTypes.UPDATE_CART: return getCart(state, action);
        case actionTypes.REMOVE_CART_ITEM: return getCart(state, action);
        case actionTypes.EMPTY_CART: return getCart(state, action);
        case actionTypes.CART_ERROR: return getCartError(state, action);
        default: return state;
    }
};

export default cartReducers;