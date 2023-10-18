import { v4 as uuid } from 'uuid'
import IToDoItem from '../../dto/IToDoItem'
import TodoRepositoryInMemory from '../../repository/inMemory/TodoRepositoryInMemory'
import NewItemUseCase from '../newItem/NewItemUseCase'
import ToggleItemUseCase from './ToggleItemUseCase'

let newItemUseCase: NewItemUseCase
let toggleItemUseCase: ToggleItemUseCase
let todoRepositoryInMemory: TodoRepositoryInMemory

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
    }

    await newItemUseCase.execute(item)
    const doneTrue = await toggleItemUseCase.execute(itemId)

    if (doneTrue && typeof doneTrue === 'object') {
      expect(doneTrue.done).toBeTruthy()
    }

    const doneFalse = await toggleItemUseCase.execute(itemId)
    if (doneFalse && typeof doneFalse === 'object') {
      expect(doneFalse.done).toBeFalsy()
    }
  })

  it('should be able to identify a toggling attempt on a non-existing item', async () => {
    const result = await toggleItemUseCase.execute('1234124')
    expect(result).toBeFalsy()
  })
})
