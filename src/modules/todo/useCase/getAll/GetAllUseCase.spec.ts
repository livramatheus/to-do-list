import { ITodoRepository } from '../../repository/ITodoRepository'
import TodoRepositoryInMemory from '../../repository/inMemory/TodoRepositoryInMemory'
import GetAllUseCase from './GetAllUseCase'
import { v4 as uuid } from 'uuid'

let getAllUseCase: GetAllUseCase
let todoRepositoryInMemory: ITodoRepository

describe('Get Items', () => {
  beforeEach(() => {
    todoRepositoryInMemory = new TodoRepositoryInMemory()
    getAllUseCase = new GetAllUseCase(todoRepositoryInMemory)
  })

  it('should be able to list all items', async () => {
    const items = await getAllUseCase.execute(uuid())
    expect(items).toHaveLength(0)
  })
})
