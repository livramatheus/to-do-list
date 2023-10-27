import { v4 as uuid } from 'uuid'
import IToDoItem from '../../dto/IToDoItem'
import { ITodoRepository } from '../../repository/ITodoRepository'
import TodoRepositoryInMemory from '../../repository/inMemory/TodoRepositoryInMemory'
import NewItemUseCase from '../newItem/NewItemUseCase'
import EditItemUseCase from './EditItemUseCase'

let editItemUseCase: EditItemUseCase
let newItemUseCase: NewItemUseCase
let todoRepository: ITodoRepository
const userId1 = uuid()
const userId2 = uuid()

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
      user: userId1,
    }

    await newItemUseCase.execute(item)
    const result = await editItemUseCase.execute({
      id: itemId,
      name: 'New Dummy Note',
      user: userId1,
    })

    if (typeof result === 'object') {
      expect(result.name).toEqual('New Dummy Note')
    }
  })

  it('should be able to identify a editing attempt on a non-existing item', async () => {
    const result = await editItemUseCase.execute({
      id: uuid(),
      name: 'New Dummy Note',
      user: userId1,
    })
    expect(result).toBeFalsy()
  })

  it('should not be able to edit an item from another user', async () => {
    const uuid1 = uuid()
    const uuid2 = uuid()

    const item1: IToDoItem = {
      id: uuid1,
      name: 'Note from user 1',
      done: false,
      user: userId1,
    }

    const item2: IToDoItem = {
      id: uuid2,
      name: 'Note from user 2',
      done: false,
      user: userId2,
    }

    await newItemUseCase.execute(item1)
    await newItemUseCase.execute(item2)

    const result1 = await editItemUseCase.execute({
      id: uuid1,
      name: 'Test 01',
      user: userId2,
    })
    const result2 = await editItemUseCase.execute({
      id: uuid2,
      name: 'Test 02',
      user: userId1,
    })
    expect(result1).toBeFalsy()
    expect(result2).toBeFalsy()
  })
})
