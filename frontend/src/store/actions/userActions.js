import axios from 'axios'

import setAuthToken from '../../axios/setAuth'
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

export const getUsers = () => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: USER_LIST_REQUEST })

    const { data } = await axios.get('/api/v1/users')

    dispatch({ type: USER_LIST_SEUCCESS, payload: data.data })
  } catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: error.response.data.error })
  }
}

export const getUserById = (id) => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/v1/users/${id}`)

    dispatch({ type: USER_DETAILS_SEUCCESS, payload: data.data })
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.error })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: USER_UPDATE_REQUEST })

    const { data } = await axios.put(`/api/v1/users/${user._id}`, user)

    dispatch({ type: USER_UPDATE_SEUCCESS, payload: data.data })
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.response.data.error })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  if (getState().auth.auth && getState().auth.token)
    setAuthToken(localStorage.token)

  try {
    dispatch({ type: USER_DELETE_REQUEST })

    await axios.delete(`/api/v1/users/${id}`)

    dispatch({ type: USER_DELETE_SEUCCESS, payload: id })
  } catch (error) {
    dispatch({ type: USER_DELETE_FAIL, payload: error.response.data.error })
  }
}
