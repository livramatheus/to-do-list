// use case para processar as operações
// repositorio para alimentar o construtor do use case
import { v4 as uuid } from 'uuid'
import ITodoRepository from '../../repository/ITodoRepository'
import TodoRepositoryInMemory from '../../repository/inMemory/TodoRepositoryInMemory'
import NewItemUseCase from './NewItemUseCase'
import IToDoItem from '../../dto/IToDoItem'
import GetAllUseCase from '../getAll/GetAllUseCase'

let newItemUseCase: NewItemUseCase
let getAllUseCase: GetAllUseCase
let todoRepository: ITodoRepository

describe('New Item', () => {
  beforeEach(() => {
    todoRepository = new TodoRepositoryInMemory()
    newItemUseCase = new NewItemUseCase(todoRepository)
    getAllUseCase = new GetAllUseCase(todoRepository)
  })

  it('should be able to create a new item', async () => {
    const item1: IToDoItem = {
      id: uuid(),
      name: 'Dummy Note 1',
      done: false,
    }

    const item2: IToDoItem = {
      id: uuid(),
      name: 'Dummy Note 2',
      done: false,
    }

    const allItems = await getAllUseCase.execute()
    expect(allItems).toHaveLength(0)

    const result1 = await newItemUseCase.execute(item1)
    expect(result1).toHaveProperty('id')
    expect(allItems).toHaveLength(1)

    await newItemUseCase.execute(item2)
    expect(allItems).toHaveLength(2)
  })
})
