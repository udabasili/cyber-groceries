import actionType from '../actionTypes'
import { apiHandler, setTokenHeader, getToken } from '../../services/api';

export const addItemToCart = (cartItem, size) =>({
    type: actionType.ADD_TO_CART,
    payload: {
        cartItem,
        size
    }
})

export const clearAllItemsFromCart = () => ({
    type: actionType.CLEAR_ALL_ITEMS_FROM_CART,
})
export const removeItemFromCart = (cartItem, size) => ({
    type: actionType.REMOVE_FROM_CART,
    payload: {
        cartItem,
        size
    }
})

export const clearItemFromCart = (id, size) => ({
    type: actionType.CLEAR_CART,
    payload: {
        cartItemId: id,
        size
    }
})

  export const toggleCartDropDown = (hideDropdown) => ({
      type: actionType.TOGGLE_CART_DROPDOWN,
      payload: hideDropdown
  });

export const submitOrder = (email, cartItems, total) => {
    const data = {
        email,
        cartItems,
        total
    }
    return dispatch =>{
    return new Promise((resolve, reject) =>{
        const token = getToken()
        const userId = sessionStorage.getItem('userId')
        setTokenHeader(token)
        try {
            apiHandler(`/api/cart/${userId}/order`,'post',data)
            .then((result) => {
                return resolve(result)
                
            }).catch((err) => {
                reject(err)
            });
        } catch (error) {
            
        }
    })}
}