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

  async delete(id: string): Promise<boolean> {
    let deleted = false

    this.data.forEach((item, index) => {
      if (item.id === id) {
        this.data.splice(index, 1)
        deleted = true
      }
    })

    return deleted
  }
}

export default TodoRepositoryInMemory
