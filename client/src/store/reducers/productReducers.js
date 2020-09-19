import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../util/utility';

const initialState = {
    allProducts: null,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: 2,
    prevPage: 0,
    lastPage: 2,
    sortByPrice: 'random',
    categories: null,
    brands: null
};


const fetchProducts = (state, action) => {
    return updateObject(state, {
        allProducts: action.products,
        currentPage: action.currentPage,
        hasNextPage: action.hasNextPage,
        hasPrevPage: action.hasPrevPage,
        nextPage: action.nextPage,
        prevPage: action.prevPage,
        lastPage: action.lastPage,
        sortByPrice: 'random'
    });
};

const sortProducts = (state, action) => {
    return updateObject(state, {
        allProducts: action.products,
        sortByPrice: action.sortByPrice
    })
};

const getCategories = (state, action) => {
    return updateObject(state, {
        categories: action.categories
    });
};

const getBrands = (state, action) => {
    return updateObject(state, {
        brands: action.brands
    });
};

const productReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS: return fetchProducts(state, action);
        case actionTypes.FETCH_PRODUCTS_BY_CATEGORY: return fetchProducts(state, action);
        case actionTypes.FETCH_PRODUCTS_BY_TAG: return fetchProducts(state, action);
        case actionTypes.SORT_PRODUCTS_BY_PRICE: return sortProducts(state, action);
        case actionTypes.FETCH_CATEGORIES: return getCategories(state, action);
        case actionTypes.FETCH_BRANDS: return getBrands(state, action);
        default: return state;
    }
};

export default productReducers;