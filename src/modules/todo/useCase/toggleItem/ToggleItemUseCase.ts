/* eslint no-useless-constructor: "off" */

import { inject, injectable } from 'tsyringe'
import { ITodoRepository, IToggleItem } from '../../repository/ITodoRepository'
import ToDoItem from '../../dto/IToDoItem'

@injectable()
class ToggleItemUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: ITodoRepository,
  ) {}

  async execute(data: IToggleItem): Promise<ToDoItem | boolean> {
    const result = await this.todoRepository.toggle(data)
    return result
  }
}

export default ToggleItemUseCase
