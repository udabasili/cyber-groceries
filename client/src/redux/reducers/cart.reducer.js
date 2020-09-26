import actionTypes from '../actionTypes'
import { addToCart, removeFromCart } from '../utils/cart.utils'

const INITIAL_STATE = {
    cart: [],
}

export default function cartReducer (state=INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return {
               cart: addToCart(action.payload.cartItem, action.payload.size, state.cart)
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
               cart: removeFromCart(action.payload.cartItem, action.payload.size, state.cart)
            }
        case actionTypes.CLEAR_ALL_ITEMS_FROM_CART:
            return {
                cart: []
            }
        case actionTypes.CLEAR_CART:
         
            return {
                
                cart: state.cart.filter((item) => (
                    item._id === action.payload.cartItemId && item.size === action.payload.size
                ))
            }
        default:
            return state
    }
}