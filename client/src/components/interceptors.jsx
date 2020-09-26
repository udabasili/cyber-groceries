import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
const axiosInterceptor = axios.interceptors.response.use((response) => {

    if (response.status === 401) {
        return <Redirect to='/auth/login'/>        
    }
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});

export default axiosInterceptor;