import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS
} from '../types/orderTypes'

const initialState = {
  order: null,
  loading: false,
  error: null,
  success: false
}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
        error: null,
        success: true
      }
    case ORDER_CREATE_FAIL:
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
