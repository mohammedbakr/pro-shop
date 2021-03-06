import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS
} from '../types/orderTypes'

const initialState = {
  orders: [],
  order: {
    user: {},
    shippingAddress: {},
    orderItems: []
  },
  loading: true,
  error: null,
  success: false
}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
    case ORDER_CREATE_REQUEST:
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload
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
    case ORDER_LIST_FAIL:
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
