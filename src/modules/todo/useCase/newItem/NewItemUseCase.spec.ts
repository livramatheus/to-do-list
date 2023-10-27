// use case para processar as operações
// repositorio para alimentar o construtor do use case
import { v4 as uuid } from 'uuid'
import { ITodoRepository } from '../../repository/ITodoRepository'
import TodoRepositoryInMemory from '../../repository/inMemory/TodoRepositoryInMemory'
import NewItemUseCase from './NewItemUseCase'
import IToDoItem from '../../dto/IToDoItem'
import GetAllUseCase from '../getAll/GetAllUseCase'

let newItemUseCase: NewItemUseCase
let getAllUseCase: GetAllUseCase
let todoRepository: ITodoRepository
const userId1 = uuid()
const userId2 = uuid()

describe('New Item', () => {
  beforeEach(() => {
    todoRepository = new TodoRepositoryInMemory()
    newItemUseCase = new NewItemUseCase(todoRepository)
    getAllUseCase = new GetAllUseCase(todoRepository)
  })

  it('should be able to create a new item assigned to an user', async () => {
    const item1: IToDoItem = {
      id: uuid(),
      name: 'Dummy Note 1',
      done: false,
      user: userId1,
    }

    const item2: IToDoItem = {
      id: uuid(),
      name: 'Dummy Note 2',
      done: false,
      user: userId1,
    }

    const item3: IToDoItem = {
      id: uuid(),
      name: 'Dummy Note 3',
      done: false,
      user: userId2,
    }

    const result1 = await newItemUseCase.execute(item1)
    await newItemUseCase.execute(item2)
    expect(result1).toHaveProperty('id')

    const result3 = await newItemUseCase.execute(item3)
    expect(result3).toHaveProperty('id')

    const allItems1 = await getAllUseCase.execute(userId1)
    const allItems2 = await getAllUseCase.execute(userId2)
    expect(allItems1).toHaveLength(2)
    expect(allItems2).toHaveLength(1)
  })
})
