import React from 'react'
import actionType from '../actionTypes'
import {
    apiHandler,setTokenHeader, getToken
} from '../../services/api'
import { addError, removeError } from './error.action'
import { setAllUsers } from './admin.action'
import { useHistory } from 'react-router-dom'

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
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('validator')
        dispatch(setCurrentUser({}));
        dispatch(setAllUsers([]))
    }
}
export const Authenticate = (userData, authPath) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiHandler(`/api/auth/${authPath}`, 'post', userData)
                .then((response) => {
                    dispatch(removeError())
                    setTokenHeader(response.generateUserToken)
                    let currentUser = response.newUser
                    sessionStorage.setItem('userId', currentUser._id);
                    sessionStorage.setItem('validator', response.generateUserToken)
                    dispatch(setCurrentUser(currentUser));
                    return resolve()
                }).catch((err) => {
                    dispatch(addError(err.message))
                    dispatch(setCurrentUser({}));
                    sessionStorage.removeItem('userId')
                    sessionStorage.removeItem('validator')
                    reject(err.message)
                });
        })
        
        
    }
}

export const confirmUserToken = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const token = getToken()
            setTokenHeader(token)
            return apiHandler(`/api/confirmUser`, 'get')
                .then((response) => {
                    console.log('here')
                    dispatch(removeError())
                    setTokenHeader(response.token)
                    let currentUser = response.user
                    sessionStorage.setItem('userId', currentUser._id);
                    sessionStorage.setItem('validator', response.token)
                    dispatch(setCurrentUser(currentUser));
                    return resolve()
                }).catch((err) => {
                    sessionStorage.removeItem('userId');
                    sessionStorage.removeItem('validator')
                    dispatch(setCurrentUser({}));
                    dispatch(addError('Please Login Again'))
                    return reject(err)
                });
        })


    }
}


export const sentPasswordReset = (emailAddress) => {
    console.log(emailAddress)
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