import * as actionTypes from './actionTypes';
import axios from '../../util/axios';

const cartFailed = (error) => {
    return {
        type: actionTypes.CART_ERROR,
        error: error
    };
};


export const getCart = () => (dispatch, getState) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        // dispatch(cartFailed('Not Authenticated'));
        let cartItems = [];
        let totalPrice = 0;
        if (localStorage.getItem('cartItems_unauth')) {
            cartItems = JSON.parse(localStorage.getItem('cartItems_unauth'));
        }
        if (localStorage.getItem('totalPrice_unauth')) {
            totalPrice = localStorage.getItem('totalPrice_unauth')
        }
        dispatch({
            type: actionTypes.GET_CART,
            cartItems: cartItems,
            totalPrice: totalPrice
        });
    }
    else {
        dispatch({
            type: actionTypes.GET_CART,
            cartItems: JSON.parse(localStorage.getItem('cartItems')),
            totalPrice: localStorage.getItem('totalPrice')
        });
    }
};

export const addToCart = (productId, quantity, size) => (dispatch, getState) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        const cartItems = getState().cart.cartItems.slice();
        let totalPrice = 0;

        let alreadyExists = false;
        cartItems.forEach(item => {
            if (item.product._id === productId && item.size === size) {
                alreadyExists = true;
                item.quantity += quantity;

                totalPrice = getTotalPrice(cartItems);
                localStorage.setItem('cartItems_unauth', JSON.stringify(cartItems));
                localStorage.setItem('totalPrice_unauth', totalPrice);
                dispatch({
                    type: actionTypes.ADD_TO_CART,
                    cartItems: cartItems,
                    totalPrice: totalPrice
                });
            }
        });
        if (!alreadyExists) {
            axios.get('/products/' + productId)
                .then(res => {
                    cartItems.push({
                        product: res.data.product,
                        quantity: quantity,
                        size: size
                    });

                    totalPrice = getTotalPrice(cartItems);
                    localStorage.setItem('cartItems_unauth', JSON.stringify(cartItems));
                    localStorage.setItem('totalPrice_unauth', totalPrice);
                    dispatch({
                        type: actionTypes.ADD_TO_CART,
                        cartItems: cartItems,
                        totalPrice: getTotalPrice(cartItems)
                    });
                })
                .catch(err => {
                    dispatch(cartFailed(err.response.data.error));
                });
        }
    }
    else {
        const body = {
            userId: userId,
            productId: productId,
            quantity: quantity,
            size: size
        }
        const token = getState().auth.token;
        axios.post('/cart', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            localStorage.setItem('cartItems', JSON.stringify(res.data.cartItems));
            localStorage.setItem('totalPrice', res.data.totalPrice);
            dispatch({
                type: actionTypes.ADD_TO_CART,
                cartItems: res.data.cartItems,
                totalPrice: res.data.totalPrice
            });
        }).catch(err => {
            dispatch(cartFailed(err.response.data.error));
        });
    }
};

export const updateCart = (productId, quantity, size) => (dispatch, getState) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        const cartItems = getState().cart.cartItems.slice();
        let totalPrice = 0;

        cartItems.forEach(item => {
            if (item.product._id === productId && item.size === size) {
                item.quantity = quantity;
            }
        });

        totalPrice = getTotalPrice(cartItems);
        localStorage.setItem('cartItems_unauth', JSON.stringify(cartItems));
        localStorage.setItem('totalPrice_unauth', totalPrice);
        dispatch({
            type: actionTypes.UPDATE_CART,
            cartItems: cartItems,
            totalPrice: totalPrice
        });
    }
    else {
        const body = {
            userId: userId,
            productId: productId,
            quantity: quantity,
            size: size
        }
        const token = getState().auth.token;
        axios.put('/cart', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            localStorage.setItem('cartItems', JSON.stringify(res.data.cartItems));
            localStorage.setItem('totalPrice', res.data.totalPrice);
            dispatch({
                type: actionTypes.UPDATE_CART,
                cartItems: res.data.cartItems,
                totalPrice: res.data.totalPrice
            });
        }).catch(err => {
            dispatch(cartFailed(err.response.data.error));
        });
    }
};

export const removeCartItem = (productId, size) => (dispatch, getState) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        let cartItems = getState().cart.cartItems.filter(item =>
            item.product._id !== productId || item.size !== size
        );
        let totalPrice = getTotalPrice(cartItems);

        dispatch({
            type: actionTypes.REMOVE_CART_ITEM,
            cartItems: cartItems,
            totalPrice: totalPrice
        });
        localStorage.setItem('cartItems_unauth', JSON.stringify(cartItems));
        localStorage.setItem('totalPrice_unauth', totalPrice);
    }
    else {
        const body = {
            userId: userId,
            productId: productId,
            size: size
        }
        const token = getState().auth.token;
        axios.put('/cart/remove-item', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            localStorage.setItem('cartItems', JSON.stringify(res.data.cartItems));
            localStorage.setItem('totalPrice', res.data.totalPrice);
            dispatch({
                type: actionTypes.REMOVE_CART_ITEM,
                cartItems: res.data.cartItems,
                totalPrice: res.data.totalPrice
            });
        }).catch(err => {
            ;
            dispatch(cartFailed(err.response.data.error));
        });
    }
};

export const emptyCart = () => (dispatch, getState) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        // dispatch(cartFailed('Not Authenticated'));
        dispatch({
            type: actionTypes.REMOVE_CART_ITEM,
            cartItems: [],
            totalPrice: 0
        });
        localStorage.setItem('cartItems_unauth', JSON.stringify([]));
        localStorage.setItem('totalPrice_unauth', 0);
    }
    else {
        const token = getState().auth.token;
        axios.put('/cart/empty', { userId: userId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            localStorage.setItem('cartItems', JSON.stringify(res.data.cartItems));
            localStorage.setItem('totalPrice', res.data.totalPrice);
            dispatch({
                type: actionTypes.EMPTY_CART,
                cartItems: res.data.cartItems,
                totalPrice: res.data.totalPrice
            });
        }).catch(err => {
            dispatch(cartFailed(err.response.data.error));
        });
    }
};

// export const resetCart = () => dispatch => {
//     dispatch({
//         type: actionTypes.RESET_CART
//     });
// };

// get cart total price
const getTotalPrice = (cartItems) => {
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += (1 - item.product.discount / 100) * item.product.price * item.quantity;
    });
    return totalPrice.toFixed(2);
}
