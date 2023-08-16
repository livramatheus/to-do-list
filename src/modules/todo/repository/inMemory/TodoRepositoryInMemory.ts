import ToDoItem from '../../dto/IToDoItem'
import ITodoRepository from '../ITodoRepository'

class TodoRepositoryInMemory implements ITodoRepository {
  data: ToDoItem[] = []

  async getAll(): Promise<ToDoItem[]> {
    return this.data
  }
}

export default TodoRepositoryInMemory
