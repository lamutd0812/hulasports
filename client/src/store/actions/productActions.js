import * as actionTypes from './actionTypes';
import axios from '../../util/axios';

const productRes = (actionTypes, res) => {
    return {
        type: actionTypes,
        products: res.data.products,
        currentPage: res.data.currentPage,
        hasNextPage: res.data.hasNextPage,
        hasPrevPage: res.data.hasPrevPage,
        nextPage: res.data.nextPage,
        prevPage: res.data.prevPage,
        lastPage: res.data.lastPage
    }
}

export const fetchProducts = (page) => dispatch => {
    axios.get('/products?page=' + page)
        .then(res => {
            dispatch(productRes(actionTypes.FETCH_PRODUCTS, res));
        })
        .catch(err => {
            console.log(err);
        });
};

export const fetchProductsByCategory = (categoryId, page) => dispatch => {
    axios.get('/products/category/' + categoryId + '?page=' + page)
        .then(res => {
            dispatch(productRes(actionTypes.FETCH_PRODUCTS_BY_CATEGORY, res));
        })
        .catch(err => {
            console.log(err);
        });
};

export const fetchProductsByTag = (tagId, page) => dispatch => {
    axios.get('/products/tag/' + tagId + '?page=' + page)
        .then(res => {
            dispatch(productRes(actionTypes.FETCH_PRODUCTS_BY_TAG, res));
        })
        .catch(err => {
            console.log(err);
        })
};

export const sortProductsByPrice = (products, sort) => dispatch => {
    const sortedProduct = products
        .slice()
        .sort((p1, p2) => (
            sort === 'lowest' ? (((1 - p1.discount / 100) * p1.price > (1 - p2.discount / 100) * p2.price) ? 1 : -1) :
                sort === 'highest' ? (((1 - p1.discount / 100) * p1.price < (1 - p2.discount / 100) * p2.price) ? 1 : -1) :
                    ((p1._id > p2._id) ? 1 : -1)
        ));
    dispatch({
        type: actionTypes.SORT_PRODUCTS_BY_PRICE,
        products: sortedProduct,
        sortByPrice: sort
    })
}

export const fetchAllCategories = () => dispatch => {
    axios.get('/categories')
        .then(res => {
            dispatch({
                type: actionTypes.FETCH_CATEGORIES,
                categories: res.data.categories
            });
        })
        .catch(err => {
            console.log(err);
        })
};

export const fetchAllBrands = () => dispatch => {
    axios.get('/brands')
        .then(res => {
            dispatch({
                type: actionTypes.FETCH_BRANDS,
                brands: res.data.brands
            });
        })
        .catch(err => {
            console.log(err);
        })
};

