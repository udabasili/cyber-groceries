import actionType from '../actionTypes'

export const addError = (error) => ({
    type: actionType.ADD_ERROR,
    payload: error

})

export const removeError = () => ({
    type: actionType.REMOVE_ERROR,

})