import axios from 'axios'

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADRESS
} from '../types/cartTypes'
import { PRODUCT_FAIL } from '../types/productTypes'

// getSatate => to access all the state => central state
export const addtoCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/v1/products/${id}`)

    if (qty > data.data.countInStock) qty = data.data.countInStock

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data.data._id,
        name: data.data.name,
        image: data.data.image,
        price: data.data.price,
        countInStock: data.data.countInStock,
        qty
      }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload: error.response.data.error
    })
  }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveshippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADRESS, payload: data })

  localStorage.setItem('shipping-address', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })

  localStorage.setItem('payment-method', JSON.stringify(data))
}
