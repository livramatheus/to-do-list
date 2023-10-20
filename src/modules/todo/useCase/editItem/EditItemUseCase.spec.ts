import { v4 as uuid } from 'uuid'
import IToDoItem from '../../dto/IToDoItem'
import { ITodoRepository } from '../../repository/ITodoRepository'
import TodoRepositoryInMemory from '../../repository/inMemory/TodoRepositoryInMemory'
import NewItemUseCase from '../newItem/NewItemUseCase'
import EditItemUseCase from './EditItemUseCase'

let editItemUseCase: EditItemUseCase
let newItemUseCase: NewItemUseCase
let todoRepository: ITodoRepository

describe('Edit Item', () => {
  beforeEach(() => {
    todoRepository = new TodoRepositoryInMemory()
    newItemUseCase = new NewItemUseCase(todoRepository)
    editItemUseCase = new EditItemUseCase(todoRepository)
  })

  it('should be albe to edit existing items', async () => {
    const itemId = uuid()
    const item: IToDoItem = {
      id: itemId,
      name: 'Dummy Note 1',
      done: false,
    }

    await newItemUseCase.execute(item)
    const result = await editItemUseCase.execute({
      id: itemId,
      name: 'New Dummy Note',
    })

    if (typeof result === 'object') {
      expect(result.name).toEqual('New Dummy Note')
    }
  })

  it('should be able to identify a editing attempt on a non-existing item', async () => {
    const result = await editItemUseCase.execute({
      id: '123123123',
      name: 'New Dummy Note',
    })
    expect(result).toBeFalsy()
  })
})
