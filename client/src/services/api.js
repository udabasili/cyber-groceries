import axios from 'axios';


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