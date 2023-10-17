import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ToggleItemUseCase from './ToggleItemUseCase'

class ToggleItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const toggleItemUseCase = container.resolve(ToggleItemUseCase)

    const todoId = request.body.id

    if (!todoId) {
      return response.status(400).json({
        message: 'Something went wrong with your request',
      })
    }

    const result = await toggleItemUseCase.execute(todoId)

    if (result) {
      return response.status(200).json(result)
    }

    return response.status(400).json({
      message: 'Error toggling item',
    })
  }
}

export default ToggleItemController
