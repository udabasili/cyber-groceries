import actionType from '../actionTypes'
import {
    apiHandler
} from '../../services/api'
import { setAllOrders, setAllUsers } from './admin.action'
import axios from 'axios'

export const setCurrentUser = (user) => ({
    type: actionType.SET_CURRENT_USER,
    payload: user

})

export const setConsent = (acceptedTerm) => ({
    type: actionType.HAS_ACCEPTED_TERMS,
    payload: acceptedTerm

})

export const toggleUserDropdown = (hideCart) => ({
    type: actionType.TOGGLE_USER_DROPDOWN,
    payload: hideCart

})

export const logOut = () => {
    return dispatch =>{
            const userId = sessionStorage.getItem('userId')
           return new Promise((resolve, reject) => {
            return apiHandler(`/api/auth/${userId}/logout`, 'get')
                .then((result) => {
                    localStorage.clear()
                    sessionStorage.clear()
                    dispatch(setCurrentUser({}));
                    dispatch(setAllUsers([]))
                    dispatch(setAllOrders([]))
                    return resolve(result)
                }).catch((err) => {
                    return reject(err)
                })
            })
    }
}
export const Authenticate = (userData, authPath) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiHandler(`/api/auth/${authPath}`, 'post', userData)
                .then((response) => {
                    let currentUser = response.newUser
                    sessionStorage.setItem('userId', currentUser._id);
                    dispatch(setCurrentUser(currentUser));
                    if(!currentUser.isAdmin){
                         dispatch(setAllUsers([]))
                         dispatch(setAllOrders([]))
                    }
                    return resolve()
                }).catch((err) => {
                    dispatch(setCurrentUser({}));
                    sessionStorage.removeItem('userId')
                    return reject(err.message)
                });
        })
        
        
    }
}

export const confirmUserToken = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiHandler(`/api/confirmUser`, 'get')
                .then((response) => {
                    let currentUser = response.user
                    sessionStorage.setItem('userId', currentUser._id);
                    dispatch(setCurrentUser(currentUser));
                    return resolve()
                }).catch((err) => {
                    sessionStorage.removeItem('userId');
                    dispatch(setCurrentUser({}));
                    return reject(err)
                });
        })


    }
}


export const sentPasswordReset = (emailAddress) => {
    return new Promise((resolve, reject) => {
        return apiHandler(`/api/auth/send-password-reset`, 'post', {emailAddress})
            .then((response) => {
                return resolve()
            }).catch((err) => {
                reject(err.message)
            });
    })
}

export const resetPassword = (code, email,password, confirmPassword) => {
    return new Promise((resolve, reject) => {
        return apiHandler(`/api/auth/reset-password`, 'post', {
            code,
                email,
                password,
                confirmPassword
            })
            .then((response) => {
                return resolve()
            }).catch((err) => {
                reject(err.message)
            });
    })
}

export const getCsrfToken = async () => {
    try {
        const { data } = await axios.get('/api/csrf-token');
        axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
    } catch (error) {
        const { data } = await axios.get('/api/csrf-token');
        axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;

        console.log("")
    }
    
   };
