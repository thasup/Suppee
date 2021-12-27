import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants.js";

// create Reducer for all products
export const productListReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_SUCCESS:
            return { products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { error: action.payload };
        default:
            return state;
    }
};

// create Reducer for a product detail
export const productDetailsReducers = (
    state = { product: { reviews: [] } },
    action
) => {
    switch (action.type) {
        case PRODUCT_DETAILS_SUCCESS:
            return { product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { error: action.payload };
        default:
            return state;
    }
};
