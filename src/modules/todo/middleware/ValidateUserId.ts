import { Request, Response, NextFunction } from 'express'
import { validate } from 'uuid'

function validateUserId(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const user = request.body.user

  if (user && typeof user === 'string' && validate(user)) {
    request.user = user
    next()
  } else {
    return response.status(400).json({
      message: 'Wrong or empty user id',
    })
  }
}

export default validateUserId
