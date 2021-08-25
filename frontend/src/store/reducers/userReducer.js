import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SEUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SEUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SEUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SEUCCESS
} from '../types/userTypes'

const initialState = {
  users: [],
  user: {},
  loading: false,
  error: null,
  success: {
    updateSuccess: false,
    deleteSuccess: false
  },
  currentPage: 0,
  pagesCount: 0
}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
    case USER_DELETE_REQUEST:
    case USER_UPDATE_REQUEST:
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: {
          updateSuccess: false,
          deleteSuccess: false
        }
      }
    case USER_LIST_SEUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        currentPage: action.payload.page,
        pagesCount: action.payload.pagesCount
      }
    case USER_DETAILS_SEUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    case USER_UPDATE_SEUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        success: {
          updateSuccess: true
        }
      }
    case USER_DELETE_SEUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users].filter((user) => user._id !== action.payload),
        success: {
          deleteSuccess: true
        }
      }
    case USER_LIST_FAIL:
    case USER_DELETE_FAIL:
    case USER_UPDATE_FAIL:
    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}
