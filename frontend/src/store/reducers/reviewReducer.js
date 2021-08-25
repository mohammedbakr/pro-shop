import {
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_RESET,
  REVIEW_CREATE_SUCCESS
} from '../types/reviewTypes'

const initialState = {
  loading: false,
  error: null,
  success: false
}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case REVIEW_CREATE_REQUEST:
      return {
        loading: true
      }
    case REVIEW_CREATE_SUCCESS:
      return {
        loading: false,
        success: true
      }
    case REVIEW_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case REVIEW_CREATE_RESET:
      return initialState

    default:
      return state
  }
}
