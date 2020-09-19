import * as actionTypes from '../actions/actionTypes';
import axios from '../../util/axios';

const getOrdersError = (error) => {
    return {
        type: actionTypes.GET_ORDERS_ERROR,
        error: error
    }
};

const getOrdersSuccess = (orders) => {
    return {
        type: actionTypes.GET_ORDERS,
        orders: orders
    }
}

const getOrderByIdSuccess = (resData) => {
    return {
        type: actionTypes.GET_ORDER_BY_ID,
        singleOrder: {
            order: resData.order,
            payment: resData.payment,
            paymentMethod: resData.paymentMethod,
            shipment: resData.shipment,
            shipmentMethod: resData.shipmentMethod,
            shipmentInfor: resData.shipmentInfor
        }
    }
}

export const getOrders = () => (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    if (!userId || !token) {
        dispatch(getOrdersError('Not Authenticated!'));
    } else {
        axios.get('/orders/' + userId, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            dispatch(getOrdersSuccess(res.data.orders));
        }).catch(err => {
            dispatch(getOrdersError(err.response.data.error));
        });
    }
};

export const getOrderById = (orderId) => (dispatch, getState) => {
    const token = getState().auth.token;
    if (!token) {
        dispatch(getOrdersError('Not Authenticated!'));
    } else {
        dispatch(getOrdersError(null)); // loading = true => Spinner
        axios.get('/order/' + orderId, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            dispatch(getOrderByIdSuccess(res.data));
        }).catch(err => {
            dispatch(getOrdersError(err.response.data.error));
        });
    }
};