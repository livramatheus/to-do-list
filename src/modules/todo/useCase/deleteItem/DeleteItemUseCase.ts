/* eslint no-useless-constructor: "off" */

import { inject, injectable } from 'tsyringe'
import { ITodoRepository } from '../../repository/ITodoRepository'
@injectable()
class DeleteItemUseCase {
  constructor(
    @inject('TodoRepository') private todoRepository: ITodoRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    const result = await this.todoRepository.delete(id)
    return result
  }
}

export default DeleteItemUseCase
