import actionType from '../actionTypes'
import { apiHandler, setTokenHeader, getToken } from '../../services/api'
import { addError, removeError } from './error.action'
import { storage } from '../../services/firebase';
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
        return apiHandler(`/api/products/get-all-products`, 'get')
            .then((result) => {
                console.log(result)
                dispatch(setProducts(result))
            }).catch((err) => {
                console.log(err)
            });

    }

}

export const addProduct = (product, imageUrl) =>{  
    return dispatch => {
        const token = getToken()
        setTokenHeader(token)
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
                console.log(result)
                    dispatch(removeError())
                    dispatch(setProducts(result.data.message))
                    resolve()
                }).catch((err) => {
                    dispatch(addError(err.response.data))
                    reject()
                });
        })
        

    }
    
        
}


export const editProduct = (product, imageUrl, productId) => {
    const token = getToken()
    setTokenHeader(token)
    return dispatch => {
        return new Promise((resolve, reject) => {
            const fileData = new FormData();
            const files = JSON.stringify(product)
            console.log(product, imageUrl, productId)
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
                console.log(result)
                dispatch(removeError())
                dispatch(setProducts(result.data.message))
                resolve()
            }).catch((err) => {
                dispatch(addError(err.response.data))
                reject()
            });
        })


    }


}


export const editProductWithUrl = (product, productId) => {
    const token = getToken()
    setTokenHeader(token)
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiHandler(`/api/products/edit-product-with-url/${productId}`, 'put', product)
                .then((result) => {
                    dispatch(removeError())
                    dispatch(setProducts(result))
                    resolve()
                }).catch((err) => {
                    dispatch(addError(err))
                });
        })



    }

}

export const deleteProduct = (productId) => {
    return dispatch => {
        const token = getToken()
        setTokenHeader(token)
        return new Promise((resolve, reject) => {
            return apiHandler(`/api/products/delete-product/${productId}`, 'delete')
                .then((result) => {
                    dispatch(removeError())
                    dispatch(setProducts(result))
                    resolve()
                }).catch((err) => {
                    dispatch(addError(err))
                    reject()
                });
        })
        
    }
}



export const uploadImage = (uri, imageName) => {
  return new Promise(async (res, rej) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = storage.ref("posts/postImages").child(imageName);
      const snapshot = await ref.put(blob);
      const imageUrl = await snapshot.ref.getDownloadURL();
      return res(imageUrl);
    } catch (error) {
      rej(error);
    }
  });
};