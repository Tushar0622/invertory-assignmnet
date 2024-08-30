import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => {
    const store = createStore(persistedReducer, applyMiddleware(thunk));
    const persistor = persistStore(store);
    return { store, persistor };
};
