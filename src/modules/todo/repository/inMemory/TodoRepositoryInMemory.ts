import ToDoItem from '../../dto/IToDoItem'
import { IEditItem, ITodoRepository } from '../ITodoRepository'

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

  async toggle(id: string): Promise<ToDoItem | boolean> {
    const element = this.data.find((item) => item.id === id)
    if (element) {
      element.done = !element.done
      return element
    }

    return false
  }

  async edit(data: IEditItem): Promise<boolean | ToDoItem> {
    const element = this.data.find((item) => item.id === data.id)
    if (element) {
      element.name = data.name
      return element
    }

    return false
  }
}

export default TodoRepositoryInMemory
