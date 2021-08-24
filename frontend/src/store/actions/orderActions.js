import axios from 'axios'

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS
} from '../types/orderTypes'
import { CART_CLEAR_ITEMS } from '../types/cartTypes'
import setAuthToken from '../../axios/setAuth'

export const getOrders = () => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: ORDER_LIST_REQUEST })

    const { data } = await axios.get('/api/v1/orders')

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response.data.error
    })
  }
}

export const addOrderItems = (order) => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: ORDER_CREATE_REQUEST })

    const { data } = await axios.post('/api/v1/orders', order)

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.data })
    dispatch({ type: CART_CLEAR_ITEMS })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response.data.error
    })
  }
}

export const getOrderById = (id) => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/v1/orders/${id}`)

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.error
    })
  }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: ORDER_PAY_REQUEST })

    const { data } = await axios.put(`/api/v1/orders/${id}/pay`, paymentResult)

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.response.data.error
    })
  }
}

export const deliverOrder = (id) => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: ORDER_DELIVER_REQUEST })

    const { data } = await axios.put(`/api/v1/orders/${id}/deliver`)

    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: error.response.data.error
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST })

    const { data } = await axios.get(`/api/v1/orders/my-orders`)

    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: error.response.data.error
    })
  }
}
