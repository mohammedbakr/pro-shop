import { combineReducers } from 'redux'

import cartReducer from './cartReducer'
import productReducer from './productReducer'
import authReducer from './authReducer'
import orderReducer from './orderReducer'
import orderPayReducer from './orderPayReducer'
import orderDeliverReducer from './orderDeliverReducer'
import orderListMyReducer from './orderListMyReducer'
import userReducer from './userReducer'

export default combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  myOrders: orderListMyReducer,
  user: userReducer
})
