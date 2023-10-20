import { container } from 'tsyringe'
import { ITodoRepository } from '../../modules/todo/repository/ITodoRepository'
import TodoRepositoryInMemory from '../../modules/todo/repository/inMemory/TodoRepositoryInMemory'

container.registerSingleton<ITodoRepository>(
  'TodoRepository',
  TodoRepositoryInMemory,
)
