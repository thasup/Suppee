import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productListReducers,
    productDetailsReducers,
    productDeleteReducers,
    productCreateReducers,
    productUpdateReducers,
    productReviewCreateReducers,
    productReviewDeleteReducers,
    productTopRatedReducers,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";
import {
    userDeleteReducers,
    userDetailsReducers,
    userListReducers,
    userLoginReducers,
    userRegisterReducers,
    userUpdateProfileReducers,
    userUpdateReducer,
} from "./reducers/userReducers.js";
import {
    orderCreateReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListReducer,
    orderMyListReducer,
    orderPayReducer,
} from "./reducers/orderReducers.js";

// combine all Reducers
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productDelete: productDeleteReducers,
    productCreate: productCreateReducers,
    productUpdate: productUpdateReducers,
    productReviewCreate: productReviewCreateReducers,
    productReviewDelete: productReviewDeleteReducers,
    productTopRated: productTopRatedReducers,
    cart: cartReducer,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    userList: userListReducers,
    userDelete: userDeleteReducers,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderMyList: orderMyListReducer,
    orderList: orderListReducer,
});

const cartItemFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : "";

const initialState = {
    cart: {
        cartItems: cartItemFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    },
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
