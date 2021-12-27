import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productListReducers,
    productDetailsReducers,
} from "./reducers/productReducers.js";

// combine all Reducers
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
});

const initialState = {};

const middleware = [thunk];

// create Store
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
