import actionTypes from '../actionTypes'

const INITIAL_STATE = {
    error: null,
}

export default function errorReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.ADD_ERROR:
            return{
                ...state,
                error: action.payload
            }
        case actionTypes.REMOVE_ERROR:
            return{
                ...state,
                error: null
            }
        default:
            return state
    }
}