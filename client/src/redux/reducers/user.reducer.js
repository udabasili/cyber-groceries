import actionTypes from '../actionTypes'

const INITIAL_STATE = {
    currentUser: null,
    isAuthenticated: false,
    isAdmin: false,
    ageVerified: false,
    hideUserCart:  true,
    hideCartDropDown: true

}

export default function userReducer(state=INITIAL_STATE, action){
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload,
                isAuthenticated: !!Object.keys(action.payload).length > 0,
                isAdmin: action.payload.isAdmin,
                ageVerified: action.payload.ageVerified,

            }
        
        case actionTypes.TOGGLE_USER_DROPDOWN:
            let hideCartDropDownValue = state.hideCartDropDown
            if(hideCartDropDownValue === false){
                hideCartDropDownValue = true
            }
            return {
                ...state,
                hideUserCart: action.payload ? action.payload :  !state.hideUserCart,
                hideCartDropDown: hideCartDropDownValue
            }
        
        case actionTypes.TOGGLE_CART_DROPDOWN:
            let hideUserCartValue = state.hideUserCart
            if (hideUserCartValue === false) {
                hideUserCartValue = true
            }
            return {
                ...state,
                hideCartDropDown: action.payload ? action.payload : !state.hideCartDropDown,
                hideUserCart: hideUserCartValue
            }

        default:
            return state;
    }
}