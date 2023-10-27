import ToDoItem from '../../dto/IToDoItem'
import {
  IDeleteItem,
  IEditItem,
  ITodoRepository,
  IToggleItem,
} from '../ITodoRepository'

class TodoRepositoryInMemory implements ITodoRepository {
  data: ToDoItem[] = []

  async getAll(user: string): Promise<ToDoItem[]> {
    const items = this.data.filter((i) => {
      return i.user === user
    })

    return items
  }

  async newItem(item: ToDoItem): Promise<ToDoItem> {
    this.data.push(item)

    return item
  }

  async delete(item: IDeleteItem): Promise<boolean> {
    const itemsBelongToUser = await this.getAll(item.user)
    const itemsDontBelongToUser = this.data.filter((i) => {
      return i.user !== item.user
    })

    if (itemsBelongToUser) {
      const newArray = itemsBelongToUser.filter((i) => {
        return i.id !== item.id
      })

      if (newArray.length < itemsBelongToUser.length) {
        this.data = [...newArray, ...itemsDontBelongToUser]
        return true
      }
    }

    return false
  }

  async toggle(data: IToggleItem): Promise<ToDoItem | boolean> {
    const itemsBelongToUser = await this.getAll(data.user)
    const element = itemsBelongToUser.find((i) => i.id === data.id)

    if (element) {
      element.done = !element.done
      return element
    }

    return false
  }

  async edit(data: IEditItem): Promise<boolean | ToDoItem> {
    const itemsBelongToUser = await this.getAll(data.user)
    const element = itemsBelongToUser.find((i) => i.id === data.id)

    if (element) {
      element.name = data.name
      return element
    }

    return false
  }
}

export default TodoRepositoryInMemory
