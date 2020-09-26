import actionTypes from '../actionTypes'

const INITIAL_STATE = {
    products:[]
}

export default function productReducer (state=INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case actionTypes.FILTER_BY_PRICE_ASCENDING:
            const products = state.products.sort((a,b) => b.price - a.price)
            console.log(products)
            return {
                ...state,
                products
            }

        case actionTypes.FILTER_BY_PRICE_DESCENDING:
            const product = state.products.sort((a, b) => b.price - a.price)
            return {
                ...state,
                products: products
        }
        default:
            return state
    }
}