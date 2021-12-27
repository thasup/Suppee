import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productListReducers,
    productDetailsReducers,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";

// combine all Reducers
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer,
});

const cartItemFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
    cart: { cartItems: cartItemFromStorage },
};

const middleware = [thunk];

// create Store
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
