import * as actionTypes from './actionTypes';
import axios from '../../util/axios';

const checkoutError = (err) => {
    return {
        type: actionTypes.CHECKOUT_ERROR,
        error: err
    };
};

const checkoutSuccess = (orderId) => {
    return {
        type: actionTypes.CHECKOUT_SUCCESS,
        orderId: orderId
    }
}

export const saveShippingInfor = (shippingInfor) => (dispatch) => {
    dispatch({
        type: actionTypes.SAVE_SHIPPING_INFOR,
        shippingInfor: shippingInfor
    });
};

export const getShipmentMethods = () => (dispatch) => {
    axios.get('/shipment-methods')
        .then(res => {
            dispatch({
                type: actionTypes.GET_SHIPMENT_METHODS,
                shipmentMethods: res.data.shipmentMethods
            });
        })
        .catch(err => {
            dispatch(checkoutError(err.response.data.error));
        })
};

export const getPaymentMethods = () => (dispatch) => {
    axios.get('/payment-methods')
        .then(res => {
            dispatch({
                type: actionTypes.GET_PAYMENT_METHODS,
                paymentMethods: res.data.paymentMethods
            });
        })
        .catch(err => {
            dispatch(checkoutError(err.response.data.error));
        })
};

export const placeOrder = (shipmentMethodId, paymentMethodId) => (dispatch, getState) => {
    const userId = localStorage.getItem('userId');
    const token = getState().auth.token;
    const shippingInfor = getState().checkout.shippingInfor;
    
    const body = {
        userId: userId,
        fullname: shippingInfor.fullname,
        address: shippingInfor.address,
        phone: shippingInfor.phone,
        message: shippingInfor.message,
        shipmentMethodId: shipmentMethodId,
        paymentMethodId: paymentMethodId
    }

    axios.post('/checkout', body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        dispatch(checkoutSuccess(res.data.orderId));
    }).catch(err => {
        dispatch(checkoutError(err.response.data.error));
    })
};
