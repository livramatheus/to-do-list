import 'reflect-metadata'
import './shared/container'
import express, { Application } from 'express'
import GetAllController from './modules/todo/useCase/getAll/GetAllController'
import NewItemController from './modules/todo/useCase/newItem/NewItemController'
import DeleteItemController from './modules/todo/useCase/deleteItem/DeleteItemController'
import ToggleItemController from './modules/todo/useCase/toggleItem/ToggleItemController'
import EditItemController from './modules/todo/useCase/editItem/EditItemController'
import validateUserId from './modules/todo/middleware/ValidateUserId'

const app: Application = express()
const port = process.env.PORT || 8000

app.use(express.json())

const getAllController = new GetAllController()
const newItemController = new NewItemController()
const deleteItemController = new DeleteItemController()
const toggleItemController = new ToggleItemController()
const editItemController = new EditItemController()

app.get('/', validateUserId, getAllController.handle)
app.post('/', validateUserId, newItemController.handle)
app.delete('/', validateUserId, deleteItemController.handle)
app.patch('/toggle', validateUserId, toggleItemController.handle)
app.patch('/edit', validateUserId, editItemController.handle)

app.listen(port, () => {
  console.log(`Server is online -> http://localhost:${port}`)
})
