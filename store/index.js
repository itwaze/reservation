import { createStore, applyMiddleware } from "redux";
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import { reducer } from '../reducers'

const persistConfig = {
  key: 'root',
  storage
};

export const store = createStore(
  persistReducer(persistConfig, reducer),
  applyMiddleware(thunk)
);

store.__PERSISTOR = persistStore(store);

