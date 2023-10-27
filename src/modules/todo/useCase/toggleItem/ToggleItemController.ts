import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ToggleItemUseCase from './ToggleItemUseCase'
import { IToggleItem } from '../../repository/ITodoRepository'

class ToggleItemController {
  async handle(request: Request, response: Response): Promise<Response | void> {
    const user = request.user

    if (user) {
      const toggleItemUseCase = container.resolve(ToggleItemUseCase)
      const todoId = request.body.id

      if (!todoId) {
        return response.status(400).json({
          message: 'Something went wrong with your request',
        })
      }

      const data: IToggleItem = {
        id: todoId,
        user,
      }

      const result = await toggleItemUseCase.execute(data)

      if (result) {
        return response.status(200).json(result)
      }

      return response.status(400).json({
        message: 'Error toggling item',
      })
    }
  }
}

export default ToggleItemController
