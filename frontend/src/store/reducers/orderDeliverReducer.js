import {
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS
} from '../types/orderTypes'

const initialState = {
  loading: false,
  error: null,
  success: false
}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true
      }
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case ORDER_DELIVER_RESET:
      return initialState

    default:
      return state
  }
}
