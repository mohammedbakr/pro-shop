import asyncHandler from 'express-async-handler'

import User from '../models/user.js'
import ErrorResponse from '../utils/errorResponse.js'
import generateAndSendTokenResponse from '../utils/sendTokenresponse.js'

const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body

  const foundUser = await User.findOne({ email })
  if (foundUser) return next(new ErrorResponse('E-Mail already exists!', 409))

  // Create user
  const user = await User.create({
    name,
    email,
    password
  })

  generateAndSendTokenResponse(user, 200, res)
})

export { createUser }
