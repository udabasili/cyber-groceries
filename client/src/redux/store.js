import rootReducer from "./rootReducer";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { persistStore } from "redux-persist";

const middleware = [thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middleware)
))

export const persistor = persistStore(store)
export default {
    store,
    persistor
};
