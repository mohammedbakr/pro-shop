import {
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER_FAIL,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_UPDATE_PROFILE_FAIL,
  AUTH_UPDATE_PROFILE_REQUEST,
  AUTH_UPDATE_PROFILE_SUCCESS
} from '../types/authTypes'

const authFromStorage = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : null

const tokenFromStorage = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token'))
  : null

const initialState = {
  auth: authFromStorage,
  token: tokenFromStorage,
  loading: false,
  error: null,
  success: false
}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case AUTH_REGISTER_REQUEST:
    case AUTH_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case AUTH_LOGIN_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
    case AUTH_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        auth: action.payload.auth,
        token: action.payload.token,
        error: null,
        success: action.payload.success
      }
    case AUTH_LOGIN_FAIL:
    case AUTH_REGISTER_FAIL:
    case AUTH_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        auth: null,
        token: null,
        error: action.payload,
        success: action.payload.success
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        auth: null,
        token: null
      }

    default:
      return state
  }
}
