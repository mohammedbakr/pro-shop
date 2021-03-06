import { combineReducers } from 'redux'

import cartReducer from './cartReducer'
import productReducer from './productReducer'
import productTopRatedReducer from './productTopRatedReducer'
import authReducer from './authReducer'
import orderReducer from './orderReducer'
import orderPayReducer from './orderPayReducer'
import orderDeliverReducer from './orderDeliverReducer'
import orderListMyReducer from './orderListMyReducer'
import userReducer from './userReducer'
import reviewReducer from './reviewReducer'

export default combineReducers({
  product: productReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  myOrders: orderListMyReducer,
  user: userReducer,
  review: reviewReducer
})
