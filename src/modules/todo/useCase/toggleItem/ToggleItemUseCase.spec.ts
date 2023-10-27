import { v4 as uuid } from 'uuid'
import IToDoItem from '../../dto/IToDoItem'
import TodoRepositoryInMemory from '../../repository/inMemory/TodoRepositoryInMemory'
import NewItemUseCase from '../newItem/NewItemUseCase'
import ToggleItemUseCase from './ToggleItemUseCase'
import { IToggleItem } from '../../repository/ITodoRepository'

let newItemUseCase: NewItemUseCase
let toggleItemUseCase: ToggleItemUseCase
let todoRepositoryInMemory: TodoRepositoryInMemory
const userId1 = uuid()
const userId2 = uuid()

describe('Toggle Item', () => {
  beforeEach(() => {
    todoRepositoryInMemory = new TodoRepositoryInMemory()
    newItemUseCase = new NewItemUseCase(todoRepositoryInMemory)
    toggleItemUseCase = new ToggleItemUseCase(todoRepositoryInMemory)
  })

  it('should be able to toggle items', async () => {
    const itemId = uuid()
    const item: IToDoItem = {
      id: itemId,
      name: 'Dummy Note 1',
      done: false,
      user: userId1,
    }

    const toggleData: IToggleItem = {
      id: itemId,
      user: userId1,
    }

    await newItemUseCase.execute(item)
    const doneTrue = await toggleItemUseCase.execute(toggleData)

    if (doneTrue && typeof doneTrue === 'object') {
      expect(doneTrue.done).toBeTruthy()
    }

    const doneFalse = await toggleItemUseCase.execute(toggleData)
    if (doneFalse && typeof doneFalse === 'object') {
      expect(doneFalse.done).toBeFalsy()
    }
  })

  it('should be able to identify a toggling attempt on a non-existing item', async () => {
    const result = await toggleItemUseCase.execute({
      id: uuid(),
      user: userId1,
    })
    expect(result).toBeFalsy()
  })

  it('should not be able to toggle an item from another user', async () => {
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

    const result1 = await toggleItemUseCase.execute({
      id: uuid1,
      user: userId2,
    })
    const result2 = await toggleItemUseCase.execute({
      id: uuid2,
      user: userId1,
    })
    expect(result1).toBeFalsy()
    expect(result2).toBeFalsy()
  })
})
