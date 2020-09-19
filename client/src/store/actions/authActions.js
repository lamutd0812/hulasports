import axios from '../../util/axios';
import * as actionTypes from './actionTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

const registerSuccess = (message) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        isSignedUp: true
    }
}

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const logout = () => {
    // clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const checkAuthTimeout = (expirationTime) => (dispatch) => {
    setTimeout(() => {
        dispatch(logout);
    }, expirationTime * 1000);
};

export const auth = (email, password) => (dispatch) => {
    dispatch(authStart());
    const authData = {
        email: email,
        password: password
    };
    axios.post('/auth/signin', authData)
        .then(res => {
            const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000); // 1h
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(res.data.token, res.data.userId));
            dispatch(checkAuthTimeout(60 * 60));

            // get cart by user
            const userId = localStorage.getItem('userId');
            axios.get('/cart/' + userId, {
                headers: {
                    'Authorization': `Bearer ${res.data.token}`
                }
            }).then(res => {
                localStorage.setItem('cartItems', JSON.stringify(res.data.cartItems));
                localStorage.setItem('totalPrice', res.data.totalPrice);
                dispatch({
                    type: actionTypes.GET_CART,
                    cartItems: res.data.cartItems,
                    totalPrice: res.data.totalPrice
                })
            }).catch(err => {
                dispatch({
                    type: actionTypes.CART_ERROR,
                    error: err.response.data.error
                });
            });
        })
        .catch(error => {
            dispatch(authFailed(error.response.data.error));
        });
};

export const register = (email, password, fullname) => (dispatch) => {
    dispatch(authStart());
    const registerData = {
        email: email,
        password: password,
        fullname: fullname
    };
    axios.put('/auth/signup', registerData)
        .then(res => {
            dispatch(registerSuccess(res.data.message));
        })
        .catch(error => {
            dispatch(authFailed(error.response.data.error));
        });
};

export const resetRegisterState = () => (dispatch) => {
    dispatch({
        type: actionTypes.RESET_REGISTER_STATE
    })
};

//keep auth state
export const checkAuthState = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    } else {
        const expirationDate = new Date(Date.parse(localStorage.getItem('expirationDate')));
        if (expirationDate <= new Date()) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
};