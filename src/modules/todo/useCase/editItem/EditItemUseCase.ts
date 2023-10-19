/* eslint no-useless-constructor: "off" */

import { inject, injectable } from 'tsyringe'
import { IEditItem, ITodoRepository } from '../../repository/ITodoRepository'
import IToDoItem from '../../dto/IToDoItem'

@injectable()
class EditItemUseCase {
  constructor(
    @inject('TodoRepository') private todoRepository: ITodoRepository,
  ) {}

  async execute(data: IEditItem): Promise<IToDoItem | boolean> {
    const result = await this.todoRepository.edit(data)
    return result
  }
}

export default EditItemUseCase
