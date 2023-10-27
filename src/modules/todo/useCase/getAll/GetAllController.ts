import { Request, Response } from 'express'
import { container } from 'tsyringe'
import GetAllUseCase from './GetAllUseCase'

class GetAllController {
  async handle(request: Request, response: Response): Promise<Response | void> {
    const getAllUseCase = container.resolve(GetAllUseCase)
    const user = request.user

    if (user) {
      const items = await getAllUseCase.execute(user)
      return response.json(items)
    }
  }
}

export default GetAllController
