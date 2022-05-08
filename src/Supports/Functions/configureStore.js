import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import ReduxThunk from 'redux-thunk'
import { rootReducers } from '../../redux/reducers/index'
 
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers)
 
export default () => {
  let store = createStore(persistedReducer, applyMiddleware(ReduxThunk))
  let persistor = persistStore(store)
  return { store, persistor }
}