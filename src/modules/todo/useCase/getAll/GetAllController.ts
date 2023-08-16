import { Request, Response } from 'express'
import { container } from 'tsyringe'
import GetAllUseCase from './GetAllUseCase'

class GetAllController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllUseCase = container.resolve(GetAllUseCase)
    const items = await getAllUseCase.execute()

    return response.json(items)
  }
}

export default GetAllController
