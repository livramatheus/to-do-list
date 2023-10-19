/* eslint no-useless-constructor: "off" */

import { inject, injectable } from 'tsyringe'
import { ITodoRepository } from '../../repository/ITodoRepository'
import ITodoItem from '../../dto/IToDoItem'

@injectable()
class NewItemUseCase {
  constructor(
    @inject('TodoRepository') private todoRepository: ITodoRepository,
  ) {}

  async execute(todoItem: ITodoItem): Promise<ITodoItem> {
    const result = await this.todoRepository.newItem(todoItem)
    return result
  }
}

export default NewItemUseCase
