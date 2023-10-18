/* eslint no-useless-constructor: "off" */

import { inject, injectable } from 'tsyringe'
import ITodoRepository from '../../repository/ITodoRepository'
import ToDoItem from '../../dto/IToDoItem'

@injectable()
class ToggleItemUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: ITodoRepository,
  ) {}

  async execute(id: string): Promise<ToDoItem | boolean> {
    const result = await this.todoRepository.toggle(id)
    return result
  }
}

export default ToggleItemUseCase
