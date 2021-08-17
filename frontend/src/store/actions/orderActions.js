import axios from 'axios'

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS
} from '../types/orderTypes'
import setAuthToken from '../../axios/setAuth'

export const addOrderItems = (order) => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: ORDER_CREATE_REQUEST })

    const { data } = await axios.post('/api/v1/orders', order)

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response.data.error
    })
  }
}
