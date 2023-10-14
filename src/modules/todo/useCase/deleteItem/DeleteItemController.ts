import { Request, Response } from 'express'
import DeleteItemUseCase from './DeleteItemUseCase'
import { container } from 'tsyringe'

class DeleteItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteItemUseCase = container.resolve(DeleteItemUseCase)
    const result = await deleteItemUseCase.execute(request.body.id)

    if (result) {
      return response.status(200).json({
        message: 'Item deleted successfully',
      })
    }

    return response.status(404).json({
      message: 'Error deleting item',
    })
  }
}

export default DeleteItemController
