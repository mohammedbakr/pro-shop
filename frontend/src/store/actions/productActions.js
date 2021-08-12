import axios from 'axios'

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL
} from './types'

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('/api/v1/products')

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response.data.error
    })
  }
}

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST })

    const { data } = await axios.get(`/api/v1/products/${id}`)

    dispatch({ type: PRODUCT_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload: error.response.data.error
    })
  }
}
