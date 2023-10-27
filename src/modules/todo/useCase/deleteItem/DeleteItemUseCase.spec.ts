import { v4 as uuid } from 'uuid'
import { ITodoRepository } from '../../repository/ITodoRepository'
import TodoRepositoryInMemory from '../../repository/inMemory/TodoRepositoryInMemory'
import NewItemUseCase from '../newItem/NewItemUseCase'
import DeleteItemUseCase from './DeleteItemUseCase'
import IToDoItem from '../../dto/IToDoItem'
import GetAllUseCase from '../getAll/GetAllUseCase'

let todoRepositoryInMemory: ITodoRepository
let deleteItemUseCase: DeleteItemUseCase
let newItemUseCase: NewItemUseCase
let getAllUseCase: GetAllUseCase
const userId1 = uuid()
const userId2 = uuid()

describe('Delete Item', () => {
  beforeEach(() => {
    todoRepositoryInMemory = new TodoRepositoryInMemory()
    deleteItemUseCase = new DeleteItemUseCase(todoRepositoryInMemory)
    newItemUseCase = new NewItemUseCase(todoRepositoryInMemory)
    getAllUseCase = new GetAllUseCase(todoRepositoryInMemory)
  })

  it('should be able to delete an existing item', async () => {
    const uuid1 = uuid()
    const uuid2 = uuid()

    const item1: IToDoItem = {
      id: uuid1,
      name: 'Dummy Note 1',
      done: false,
      user: userId1,
    }

    const item2: IToDoItem = {
      id: uuid2,
      name: 'Dummy Note 2',
      done: false,
      user: userId1,
    }

    await newItemUseCase.execute(item1)
    await newItemUseCase.execute(item2)

    const result = await deleteItemUseCase.execute({
      id: uuid1,
      user: userId1,
    })
    expect(result).toBeTruthy()

    const all = await getAllUseCase.execute(userId1)
    expect(all).toHaveLength(1)
  })

  it('should be able to identify a deletion attempt on a non-existing item', async () => {
    const result = await deleteItemUseCase.execute({
      id: uuid(),
      user: userId1,
    })
    expect(result).toBeFalsy()
  })

  it('should not be able to delete an item from another user', async () => {
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

    const result1 = await deleteItemUseCase.execute({
      id: uuid1,
      user: userId2,
    })
    const result2 = await deleteItemUseCase.execute({
      id: uuid2,
      user: userId1,
    })
    expect(result1).toBeFalsy()
    expect(result2).toBeFalsy()
  })
})
