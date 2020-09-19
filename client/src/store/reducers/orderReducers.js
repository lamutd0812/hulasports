import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/utility';

const initialState = {
    orders: [],
    singleOrder: {
        order: {},
        payment: {},
        paymentMethod: '',
        shipment: {},
        shipmentMethod: '',
        shipmentInfor: {},
    },
    loading: true,
    error: null
}

const getOrders = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false,
        error: null
    });
}

const getOrderById = (state, action) => {
    return updateObject(state, {
        singleOrder: action.singleOrder,
        loading: false,
        error: null
    });
}

const getOrdersError = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: action.error
    })
}

const orderReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS: return getOrders(state, action);
        case actionTypes.GET_ORDER_BY_ID: return getOrderById(state, action);
        case actionTypes.GET_ORDERS_ERROR: return getOrdersError(state, action);
        default: return state;
    }
}

export default orderReducers;