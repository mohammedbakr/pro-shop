// Get token from model, generate the token and send the response
const generateAndSendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken()

  res.status(statusCode).json({ success: true, token })
}

export default generateAndSendTokenResponse
