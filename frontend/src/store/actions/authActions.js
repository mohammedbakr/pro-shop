import axios from 'axios'

import setAuthToken from '../../axios/setAuth'

import {
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER_FAIL,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_UPDATE_PROFILE_REQUEST,
  AUTH_UPDATE_PROFILE_SUCCESS,
  AUTH_UPDATE_PROFILE_FAIL
} from '../types/authTypes'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOGIN_REQUEST })

    const { data } = await axios.post('/api/v1/auth/login', { email, password })

    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: {
        auth: data.data.user,
        token: data.data.token
      }
    })

    localStorage.setItem('auth', JSON.stringify(data.data.user))
    localStorage.setItem('token', JSON.stringify(data.data.token))
  } catch (error) {
    dispatch({ type: AUTH_LOGIN_FAIL, payload: error.response.data.error })

    localStorage.removeItem('auth')
    localStorage.removeItem('token')
  }
}

export const logout = () => (dispatch) => {
  dispatch({ type: AUTH_LOGOUT })

  localStorage.removeItem('auth')
  localStorage.removeItem('token')
}

export const register = (authInfo) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REGISTER_REQUEST })

    const { data } = await axios.post('/api/v1/auth/register', authInfo)

    dispatch({
      type: AUTH_REGISTER_SUCCESS,
      payload: {
        auth: data.data.user,
        token: data.data.token
      }
    })

    localStorage.setItem('auth', JSON.stringify(data.data.user))
    localStorage.setItem('token', JSON.stringify(data.data.token))
  } catch (error) {
    dispatch({ type: AUTH_REGISTER_FAIL, payload: error.response.data.error })

    localStorage.removeItem('auth')
    localStorage.removeItem('token')
  }
}

// export const getAuthProfile = () => async (dispatch, getState) => {
//   if (getState().auth.auth && getState().auth.token)
//     setAuthToken(localStorage.token)

//   try {
//     dispatch({ type: AUTH_DETAILS_REQUEST })

//     const { data } = await axios.get(`/api/v1/auth/profile`)

//     dispatch({
//       type: AUTH_DETAILS_SUCCESS,
//       payload: data.data
//     })
//   } catch (error) {
//     dispatch({ type: AUTH_DETAILS_FAIL, payload: error.response.data.error })
//   }
// }

export const updateUserProfile = (user) => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: AUTH_UPDATE_PROFILE_REQUEST })

    const { data } = await axios.put(
      `/api/v1/auth/profile/update-profile`,
      user
    )

    dispatch({
      type: AUTH_UPDATE_PROFILE_SUCCESS,
      payload: {
        auth: data.data.user,
        token: data.data.token,
        success: data.success
      }
    })

    localStorage.setItem('auth', JSON.stringify(data.data.user))
    localStorage.setItem('token', JSON.stringify(data.data.token))
  } catch (error) {
    dispatch({
      type: AUTH_UPDATE_PROFILE_FAIL,
      payload: error.response.data.error
    })
  }
}
