/* eslint no-useless-constructor: "off" */

import { inject, injectable } from 'tsyringe'
import { IDeleteItem, ITodoRepository } from '../../repository/ITodoRepository'
@injectable()
class DeleteItemUseCase {
  constructor(
    @inject('TodoRepository') private todoRepository: ITodoRepository,
  ) {}

  async execute(item: IDeleteItem): Promise<boolean> {
    const result = await this.todoRepository.delete(item)
    return result
  }
}

export default DeleteItemUseCase
