import IToDoItem from '../dto/IToDoItem'

interface IEditItem {
  id: string
  name: string
}

interface ITodoRepository {
  getAll(): Promise<IToDoItem[]>
  newItem(item: IToDoItem): Promise<IToDoItem>
  delete(id: string): Promise<boolean>
  toggle(id: string): Promise<IToDoItem | boolean>
  edit(data: IEditItem): Promise<IToDoItem | boolean>
}

export { IEditItem, ITodoRepository }
