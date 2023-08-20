import ITodoItem from '../dto/IToDoItem'

export default interface ITodoRepository {
  getAll(): Promise<ITodoItem[]>
  newItem(item: ITodoItem): Promise<ITodoItem>
}
