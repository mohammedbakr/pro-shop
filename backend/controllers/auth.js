import asyncHandler from 'express-async-handler'

import User from '../models/user.js'
import ErrorResponse from '../utils/errorResponse.js'
import generateAndSendTokenResponse from '../utils/sendTokenresponse.js'

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

const getAuth = asyncHandler((req, res) => {
  res.status(200).json({ success: true, data: req.user })
})

export { getAuth, login }
