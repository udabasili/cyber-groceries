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

const persistConfig = {
    key: 'root',
    storage
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