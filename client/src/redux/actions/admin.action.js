import {
    apiHandler, setTokenHeader, getToken
} from '../../services/api'
import actionType from '../actionTypes'

export const setAllUsers = (user) => ({
    type: actionType.GET_ALL_USERS,
    payload: user

})
export const setAllOrders = (orders) => ({
    type: actionType.GET_ALL_ORDERS,
    payload: orders

})


export const getAllUsers = () => {
    return dispatch => {
        return new Promise((res, rej) =>{
            const token = getToken()
            setTokenHeader(token)
            const userId = sessionStorage.getItem('userId')
            return apiHandler(`/api/admin/${userId}/all-users`, 'get')
                .then((response) => {
                    dispatch(setAllUsers(response));
                    return res(response)
                }).catch((error) => {
                    return rej(error)
                    })
                })
            }
}

export const getTotalCost = () => {
        return new Promise((res, rej) => {
            const token = getToken()
            setTokenHeader(token)
            const userId = sessionStorage.getItem('userId')
            return apiHandler(`/api/admin/${userId}/get-total-cost`, 'get')
                .then((response) => {
                    return res(response)
                }).catch((error) => {
                    console.log(error)

                    // return rej(error)
                })
        })
    
}


export const deleteUser = (uid) => {
    return dispatch => {
        return new Promise((res, rej) => {
            const token = getToken()
            setTokenHeader(token)
            const currentUserId = sessionStorage.getItem('userId')
            return apiHandler(`/api/admin/${currentUserId}/edit-user-email/${uid}`, 'delete')
                .then((response) => {
                    console.log(response)
                    dispatch(setAllUsers(response));
                    return res()
                }).catch((error) => {
                    console.log(error)

                    // return rej(error)
                })
        })
    }
}
export const editUserEmail = (email, uid) => {
    return dispatch => {
        return new Promise((res, rej) => {
            const token = getToken()
            setTokenHeader(token)
            const currentUserId = sessionStorage.getItem('userId')
            return apiHandler(`/api/admin/${currentUserId}/edit-user-email/${uid}`, 'put', email)
                .then((response) => {
                    dispatch(setAllUsers(response));
                    return res('Success')
                }).catch((error) => {
                    return rej(error)
                })
        })
    }
}

export const disableUser = (uid) => {
    return dispatch => {
        return new Promise((res, rej) => {
            const token = getToken()
            setTokenHeader(token)
            const currentUserId = sessionStorage.getItem('userId')
            return apiHandler(`/api/admin/${currentUserId}/disable/${uid}`, 'get')
                .then((response) => {
                    console.log(response)
                    dispatch(setAllUsers(response));
                    return res()
                }).catch((error) => {
                    console.log(error)

                    // return rej(error)
                })
        })
    }
}

export const enableUser = (uid) => {
    return dispatch => {
        return new Promise((res, rej) => {
            const token = getToken()
            setTokenHeader(token)
            const currentUserId = sessionStorage.getItem('userId')
            return apiHandler(`/api/admin/${currentUserId}/enable/${uid}`, 'get')
                .then((response) => {
                    console.log(response)
                    dispatch(setAllUsers(response));
                    return res()
                }).catch((error) => {
                    return rej(error)
                })
        })
    }
}

export const editUserProfile = (userData, uid) => {
    return dispatch => {
        return new Promise((res, rej) => {
            const token = getToken()
            setTokenHeader(token)
            const currentUserId = sessionStorage.getItem('userId')
            return apiHandler(`/api/admin/${currentUserId}/update/${uid}`, 'put', userData)
                .then((response) => {
                    console.log(response)
                    dispatch(setAllUsers(response));
                    return res()
                }).catch((error) => {
                    console.log(error)

                    // return rej(error)
                })
        })
    }
}

export const getUserChatData = () => {
        return new Promise((res, rej) => {
            const token = getToken()
            setTokenHeader(token)
            const userId = sessionStorage.getItem('userId')
            return apiHandler(`/api/admin/${userId}/get-user-chart-data`, 'get')
                .then((response) => {
                    return res(response)
                }).catch((error) => {
                    console.log(error)
                    return rej(error)
                    // return rej(error)
                })
        })
    
}

export const getUserOrderById = (userId) =>{
    return new Promise((res,rej) =>{
            const token = getToken()
            setTokenHeader(token)
            const currentUserId = sessionStorage.getItem('userId')
            return apiHandler(`/api/admin/${currentUserId}/get-user-order/${userId}`, 'get')
                .then((result) => {
                    res(result)
                }).catch((err) => {
                    rej(err)
                });

    })
}

export const getAllUsersOrder = () => {
    return dispatch=>{
        return new Promise((res, rej) => {
            const token = getToken()
            setTokenHeader(token)
            const currentUserId = sessionStorage.getItem('userId')
            return apiHandler(`/api/admin/${currentUserId}/get-users-orders`, 'get')
                .then((result) => {
                    dispatch(setAllOrders(result))
                    res(result)
                }).catch((err) => {
                    rej(err)
                });

        })
    }
}

export const setOrderById = (userId, order) => {
    return dispatch => {
        return new Promise((res, rej) => {
            const token = getToken()
            setTokenHeader(token)
            const currentUserId = sessionStorage.getItem('userId')
            return apiHandler(`/api/admin/${currentUserId}/set-user-orders/${userId}`, 'post', order)
                .then((result) => {
                    dispatch(setAllOrders(result))
                    res()
                }).catch((err) => {
                    rej()
                });

        })
    }
}