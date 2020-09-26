import axios from 'axios';

const tokenHeader =(token) =>{
    if(token){
        axios.defaults.headers.common.Authorization =`Bearer ${token}`
    }else{
        delete axios.defaults.headers.common.Authorization
    }
}

export const setTokenHeader = (token) =>{
    tokenHeader(token)
}

export const getToken = () => {
    const token = sessionStorage.getItem('validator')
    return token
}

export const apiHandler = (path, method, data) => {
    return new Promise((resolve, reject) =>{
        return axios[method.toLowerCase()](path, data)
            .then((result) => {
                resolve(result.data.message)
            }).catch((err) => {
                reject(err.response.data)
            });

    })
}