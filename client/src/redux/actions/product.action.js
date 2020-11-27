import actionType from '../actionTypes'
import { apiHandler } from '../../services/api'
import axios from 'axios'

export const setProducts = (products) => ({
    type: actionType.SET_PRODUCTS,
    payload: products

})

export const filterByPrice = () => ({
    type: actionType.FILTER_BY_PRICE_ASCENDING,

})

export const getAllProducts = () => {
    return dispatch => {
        return apiHandler(`/api/public/get-all-products`, 'get')
            .then((result) => {
                dispatch(setProducts(result))
            }).catch((err) => {
                console.error(err)
            });

    }

}

export const addProduct = (product, imageUrl) =>{  
    return dispatch => {
        return new Promise((resolve, reject) => {
            const fileData = new FormData();
            const files = JSON.stringify(product)
            fileData.append('imageUrl',imageUrl)
            fileData.append('productData', files)
            axios({
                method: 'post',
                url: '/api/products/add-product',
                data: fileData,
                headers:{
                    'Content-Type': 'multipart/form-data'
                }

            }).then((result) => {
                    dispatch(setProducts(result.data.message))
                    return resolve()
                }).catch((err) => {
                    return reject(err.response.data)
                });
        })
        

    }
    
        
}


export const editProduct = (product, imageUrl, productId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const fileData = new FormData();
            const files = JSON.stringify(product)
            fileData.append('imageUrl', imageUrl)
            fileData.append('productData', files)
            axios({
                method: 'put',
                url: `/api/products/edit-product/${productId}`,
                data: fileData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            }).then((result) => {
                dispatch(setProducts(result.data.message))
                return resolve()
            }).catch((err) => {
                return reject(err.response.data)
            });
        })


    }


}


export const editProductWithUrl = (product, productId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiHandler(`/api/products/edit-product-with-url/${productId}`, 'put', product)
                .then((result) => {
                    dispatch(setProducts(result))
                    return resolve()
                }).catch((err) => {
                    return reject(err)
                });
        })



    }

}

export const deleteProduct = (productId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiHandler(`/api/products/delete-product/${productId}`, 'delete')
                .then((result) => {
                    dispatch(setProducts(result))
                    return resolve()
                }).catch((err) => {
                    return reject(err)
                });
        })
        
    }
}



