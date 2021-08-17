import { combineReducers } from 'redux'

import cartReducer from './cartReducer'
import productReducer from './productReducer'
import authReducer from './authReducer'

export default combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer
})
