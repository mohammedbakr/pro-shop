import axios from 'axios'

import setAuthToken from '../../axios/setAuth'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL
} from '../types/productTypes'

export const getProducts =
  (keyword = '', page = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      const { data } = await axios.get(
        `/api/v1/products?q=${keyword}&page=${page}`
      )

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: {
          products: data.data.products,
          page: data.data.page,
          pagesCount: data.data.pagesCount
        }
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response.data.error
      })
    }
  }

export const getTopRatedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })

    const { data } = await axios.get('/api/v1/products/top')

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data.data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload: error.response.data.error
    })
  }
}

export const createProduct = () => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST })

    const { data } = await axios.post(`/api/v1/products`)

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response.data.error
    })
  }
}

export const getProductById = (id) => async (dispatch) => {
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

export const updateProduct = (product) => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST })

    const { data } = await axios.put(`/api/v1/products/${product._id}`, product)

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response.data.error
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })

    await axios.delete(`/api/v1/products/${id}`)

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: id })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response.data.error
    })
  }
}
