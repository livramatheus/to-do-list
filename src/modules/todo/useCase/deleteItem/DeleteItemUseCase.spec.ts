import { v4 as uuid } from 'uuid'
import ITodoRepository from '../../repository/ITodoRepository'
import TodoRepositoryInMemory from '../../repository/inMemory/TodoRepositoryInMemory'
import NewItemUseCase from '../newItem/NewItemUseCase'
import DeleteItemUseCase from './DeleteItemUseCase'
import IToDoItem from '../../dto/IToDoItem'
import GetAllUseCase from '../getAll/GetAllUseCase'

let todoRepositoryInMemory: ITodoRepository
let deleteItemUseCase: DeleteItemUseCase
let newItemUseCase: NewItemUseCase
let getAllUseCase: GetAllUseCase

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
    }

    const item2: IToDoItem = {
      id: uuid2,
      name: 'Dummy Note 2',
      done: false,
    }

    newItemUseCase.execute(item1)
    newItemUseCase.execute(item2)

    const result = await deleteItemUseCase.execute(uuid1)
    expect(result).toBeTruthy()

    const all = await getAllUseCase.execute()
    expect(all).toHaveLength(1)
  })

  it('should be able to identify a deletion attempt on a non-existing item', async () => {
    const result = await deleteItemUseCase.execute('9999')
    expect(result).toBeFalsy()
  })
})
