import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/utility';

const initialState = {
    shippingInfor: null,
    shipmentMethods: null,
    paymentMethods: null,
    payment: null,
    shipment: null,
    error: null,
    createdOrderId: null
}

const saveShippingInfor = (state, action) => {
    return updateObject(state, {
        shippingInfor: action.shippingInfor,
        error: null
    })
};

const getShipmentMethods = (state, action) => {
    return updateObject(state, {
        shipmentMethods: action.shipmentMethods,
        error: null
    });
};

const getPaymentMethods = (state, action) => {
    return updateObject(state, {
        paymentMethods: action.paymentMethods,
        error: null
    });
};

const checkoutSuccess = (state, action) => {
    return updateObject(state, {
        createdOrderId: action.orderId
    })
};

const getCheckoutError = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_SHIPPING_INFOR: return saveShippingInfor(state, action);
        case actionTypes.GET_SHIPMENT_METHODS: return getShipmentMethods(state, action);
        case actionTypes.GET_PAYMENT_METHODS: return getPaymentMethods(state, action);
        case actionTypes.CHECKOUT_SUCCESS: return checkoutSuccess(state, action);
        case actionTypes.CHECKOUT_ERROR: return getCheckoutError(state, action);
        default: return state;
    }
}

export default checkoutReducer;