import actionType from '../actionTypes'
import { apiHandler } from '../../services/api';

export const addItemToCart = (cartItem, quantity) =>({
    type: actionType.ADD_TO_CART,
    payload: {
        cartItem,
        quantity
    }
})

export const clearAllItemsFromCart = () => ({
    type: actionType.CLEAR_ALL_ITEMS_FROM_CART,
})
export const removeItemFromCart = (cartItem) => ({
    type: actionType.REMOVE_FROM_CART,
    payload: {
        cartItem
    }
})

export const clearItemFromCart = (cartItemId) => ({
    type: actionType.CLEAR_CART,
    payload: {
        cartItemId
    }
})

  export const toggleCartDropDown = (hideDropdown) => ({
      type: actionType.TOGGLE_CART_DROPDOWN,
      payload: hideDropdown
  });

export const submitOrder = (email, cartItems, total, completeAddress, deliveryMethod) => {
    const data = {
        email,
        cartItems,
        total,
        completeAddress,
        deliveryMethod
    }
    return dispatch =>{
    return new Promise((resolve, reject) =>{
        const userId = sessionStorage.getItem('userId')
            apiHandler(`/api/cart/${userId}/order`,'post',data)
                .then((result) => {
                    return resolve(result)
                    
            }).catch((err) => {
                return reject(err)
            });
    })}
}