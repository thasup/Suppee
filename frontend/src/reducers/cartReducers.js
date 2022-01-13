import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_RESET_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

// search in the state.cartItems array
// for the existence of the specific product
export const cartReducer = (
    state = { cartItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            // that is defined by item (by the action.payload)
            const item = action.payload;

            // if we find a match assign the result to the existItem variable
            const existItem = state.cartItems.find(
                (x) => x.product === item.product
            );

            // if there is already a product matching the item in the state.cartItems array
            if (existItem) {
                // return the existing state with adjusted cartItems
                return {
                    ...state,
                    // map through the cardItems array and replace the matching product with the new item
                    // leave the rest products as they were
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
                // otherwise if the item is NOT already a product matching the item in the state.cartItems array
            } else {
                // return the existing state with adjusted cardItems
                return {
                    ...state,
                    // return a new cardItems array with the previous products spread and add the new item
                    cartItems: [...state.cartItems, item],
                };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) => x.product !== action.payload
                ),
            };
        case CART_RESET_ITEM:
            return {
                ...state,
                cartItems: [],
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };

        default:
            return state;
    }
};
