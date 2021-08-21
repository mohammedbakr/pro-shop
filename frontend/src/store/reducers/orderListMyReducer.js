import {
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS
} from '../types/orderTypes'

const initialState = {
  orders: null,
  loading: true,
  error: null
}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ORDER_LIST_MY_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null
      }
    case ORDER_LIST_MY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}
