import {combineReducers} from 'redux'
import productReducer from './reducers/product.reducer'
import storageSession from 'redux-persist/lib/storage/session'
import {
    persistReducer
} from "redux-persist";
import userReducer from './reducers/user.reducer';
import cartReducer from './reducers/cart.reducer';
import adminReducer from './reducers/admin.reducer';
import errorReducer from './reducers/error.reducer';
import { acceptTermsReducer } from './reducers/acceptTerms.reducer';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const encryptor = encryptTransform({
    secretKey: process.env.REACT_APP_SECRET_KEY,
    onError: function (error) {
        // Handle the error.
    },
})




const authPersistConfig = {
    key: 'auth',
    storage: storageSession,
    transforms: [encryptor]
}

const adminPersistConfig = {
    key: 'admin',
    storage: storageSession,
    transforms: [encryptor]
}

const persistConfig = {
    key: 'root',
    storage: storageSession ,
    blacklist: ['user', 'admin']
}
const rootReducer = combineReducers({
    product: productReducer,
    user: persistReducer(authPersistConfig, userReducer),
    cart: cartReducer,
    admin: persistReducer(adminPersistConfig, adminReducer),
    error: errorReducer,
    acceptTerms: acceptTermsReducer
})


export default persistReducer(persistConfig, rootReducer);