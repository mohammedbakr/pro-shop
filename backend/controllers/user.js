import asyncHandler from 'express-async-handler'

import User from '../models/user.js'
import ErrorResponse from '../utils/errorResponse.js'

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({})

  res.status(200).json({ success: true, data: users })
})

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

  res.status(201).json({ success: true, data: user })
})

const getUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id

  const user = await User.findById(id)
  if (!user) return next(new ErrorResponse('User not found', 404))

  res.status(200).json({ success: true, data: user })
})

const updateUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id

  const user = await User.findById(id)
  if (!user) return next(new ErrorResponse('User not found', 404))

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({ success: true, data: updatedUser })
})

const deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id

  const user = await User.findById(id)
  if (!user) return next(new ErrorResponse('User not found', 404))
  if (req.user._id.toString() === user._id.toString())
    return next(new ErrorResponse("An admin can't delete himself"))

  await user.remove()

  res.status(200).json({ success: true, data: {} })
})

export { getUsers, createUser, deleteUser, getUserById, updateUser }
