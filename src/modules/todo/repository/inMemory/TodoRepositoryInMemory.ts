import ToDoItem from '../../dto/IToDoItem'
import ITodoRepository from '../ITodoRepository'

class TodoRepositoryInMemory implements ITodoRepository {
  data: ToDoItem[] = []

  async getAll(): Promise<ToDoItem[]> {
    return this.data
  }

  async newItem(item: ToDoItem): Promise<ToDoItem> {
    this.data.push(item)

    return item
  }
}

export default TodoRepositoryInMemory
