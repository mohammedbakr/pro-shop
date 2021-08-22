import ErrorResponse from '../utils/errorResponse.js'

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next()
  else return next(new ErrorResponse('Not authorized as an admin', 403))
}

export default isAdmin
