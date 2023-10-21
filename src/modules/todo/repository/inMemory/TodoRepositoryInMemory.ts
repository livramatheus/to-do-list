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
    const newArray = this.data.filter((item) => {
      return item.id !== id
    })

    if (newArray.length < this.data.length) {
      this.data = newArray
      return true
    }

    return false
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
