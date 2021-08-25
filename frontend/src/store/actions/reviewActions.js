import axios from 'axios'

import setAuthToken from '../../axios/setAuth'
import {
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS
} from '../types/reviewTypes'

export const createReview =
  (productId, review) => async (dispatch, getState) => {
    if (getState().auth.auth && getState().auth.token)
      setAuthToken(localStorage.token)

    try {
      dispatch({ type: REVIEW_CREATE_REQUEST })

      await axios.post(`/api/v1/products/${productId}/reviews`, review)

      dispatch({ type: REVIEW_CREATE_SUCCESS })
    } catch (error) {
      dispatch({
        type: REVIEW_CREATE_FAIL,
        payload: error.response.data.error
      })
    }
  }
