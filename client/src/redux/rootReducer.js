import {combineReducers} from 'redux'
import productReducer from './reducers/product.reducer'
import storage from "redux-persist/lib/storage";
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

const persistConfig = {
    key: 'root',
    storage,
    transforms : [encryptor],
    blacklist: ['product'] 
}
const rootReducer = combineReducers({
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    admin: adminReducer,
    error: errorReducer,
    acceptTerms: acceptTermsReducer
})


export default persistReducer(persistConfig, rootReducer);