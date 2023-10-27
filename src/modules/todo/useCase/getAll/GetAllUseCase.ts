/* eslint no-useless-constructor: "off" */

import { inject, injectable } from 'tsyringe'
import ITodoItem from '../../dto/IToDoItem'
import { ITodoRepository } from '../../repository/ITodoRepository'

@injectable()
class GetAllUseCase {
  constructor(
    @inject('TodoRepository') private todoRepository: ITodoRepository,
  ) {}

  async execute(user: string): Promise<ITodoItem[]> {
    const items = await this.todoRepository.getAll(user)

    return items
  }
}

export default GetAllUseCase
