import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { v4 as uuid } from 'uuid'
import NewItemUseCase from './NewItemUseCase'
import IToDoItem from '../../dto/IToDoItem'

class NewItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const item: IToDoItem = {
      id: uuid(),
      name: request.body.name,
      done: false,
    }

    const newItemUseCase = container.resolve(NewItemUseCase)
    const result = await newItemUseCase.execute(item)

    return response.json(result)
  }
}

export default NewItemController
