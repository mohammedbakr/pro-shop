import asyncHandler from 'express-async-handler'

import User from '../models/user.js'
import ErrorResponse from '../utils/errorResponse.js'
import generateAndSendTokenResponse from '../utils/sendTokenresponse.js'

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body

  const foundUser = await User.findOne({ email })
  if (foundUser) return next(new ErrorResponse('E-Mail already exists!', 409))

  // Create user
  const user = await User.create({
    name,
    email,
    password
  })

  generateAndSendTokenResponse(user, 201, res)
})

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  // Validate email & password
  if (!email || !password)
    return next(new ErrorResponse('please provide an email and password', 40))

  const user = await User.findOne({ email }).select('+password')
  if (!user) return next(new ErrorResponse('Invalid credentials.', 401))

  // Check if password matches
  const isMatch = await user.matchPassword(password)
  if (!isMatch) return next(new ErrorResponse('Invalid credentials.', 401))

  generateAndSendTokenResponse(user, 200, res)
})

const getAuthProfile = asyncHandler((req, res, next) => {
  if (!req.user) return next(new ErrorResponse('User not found!', 404))

  res.status(200).json({ success: true, data: req.user })
})

const updateProfile = asyncHandler(async (req, res, next) => {
  const id = req.user._id

  const user = await User.findById(id)
  if (!user) return next(new ErrorResponse('User not found!', 404))

  const { name, email, password } = req.body

  user.name = name || user.name
  user.email = email || user.email
  if (password) user.password = password

  const updatedUser = await user.save()

  generateAndSendTokenResponse(updatedUser, 200, res)
})

export { register, login, getAuthProfile, updateProfile }
