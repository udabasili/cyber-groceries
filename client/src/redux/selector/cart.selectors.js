import {createSelector} from 'reselect'

const cart = state => state.cart.cart

export const countCart= createSelector(
    [cart],
    (cartItems) => cartItems.reduce((total, currentItem) =>(
        total += currentItem.quantity
    ),0)
)