import IToDoItem from '../dto/IToDoItem'

interface IDeleteItem {
  id: string
  user: string
}

interface IToggleItem {
  id: string
  user: string
}

interface IEditItem {
  id: string
  name: string
  user: string
}

interface ITodoRepository {
  getAll(user: string): Promise<IToDoItem[]>
  newItem(item: IToDoItem): Promise<IToDoItem>
  delete(item: IDeleteItem): Promise<boolean>
  toggle(data: IToggleItem): Promise<IToDoItem | boolean>
  edit(data: IEditItem): Promise<IToDoItem | boolean>
}

export { IDeleteItem, IEditItem, IToggleItem, ITodoRepository }
