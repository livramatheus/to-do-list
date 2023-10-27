import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IEditItem } from '../../repository/ITodoRepository'
import EditItemUseCase from './EditItemUseCase'

class EditItemController {
  async handle(request: Request, response: Response): Promise<Response | void> {
    const user = request.user

    if (user) {
      const editItemUseCase = container.resolve(EditItemUseCase)
      const newData: IEditItem = {
        id: request.body.id,
        name: request.body.name,
        user,
      }

      const result = await editItemUseCase.execute(newData)

      if (result) {
        return response.status(200).json(result)
      }

      return response.status(400).json({
        message: 'Error editing item',
      })
    }
  }
}

export default EditItemController
