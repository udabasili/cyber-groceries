import actionTypes from '../actionTypes'

const INITIAL_STATE = {
    allUsers: null,
    orders: []
}

export default function adminReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.GET_ALL_USERS:
            return{
                ...state,
                allUsers: action.payload
            }
        case actionTypes.GET_ALL_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        default:
            return state
    }
}