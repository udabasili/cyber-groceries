import actionTypes from '../actionTypes'

export const acceptTermsReducer = (state = {
        hasAcceptedTerms: false
    }, action) => {
    switch (action.type) {
        case actionTypes.HAS_ACCEPTED_TERMS:
            return {
                ...state,
                hasAcceptedTerms: action.payload
            }
        default:
            return state
    }
}