import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productListReducers,
    productDetailsReducers,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";
import { userLoginReducers } from "./reducers/userReducers.js";

// combine all Reducers
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer,
    userLogin: userLoginReducers,
});

const cartItemFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    cart: { cartItems: cartItemFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

// create Store
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;