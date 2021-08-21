import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS
} from '../types/orderTypes'

const initialState = {
  order: null,
  loading: true,
  error: null,
  success: false
}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ORDER_CREATE_SUCCESS:
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
        error: null,
        success: true
      }
    case ORDER_CREATE_FAIL:
    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      }

    default:
      return state
  }
}
