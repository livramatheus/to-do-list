import 'reflect-metadata'
import './shared/container'
import express, { Application } from 'express'
import GetAllController from './modules/todo/useCase/getAll/GetAllController'
import NewItemController from './modules/todo/useCase/newItem/NewItemController'
import DeleteItemController from './modules/todo/useCase/deleteItem/DeleteItemController'
import ToggleItemController from './modules/todo/useCase/toggleItem/ToggleItemController'
import EditItemController from './modules/todo/useCase/editItem/EditItemController'

const app: Application = express()
const port = process.env.PORT || 8000

app.use(express.json())

const getAllController = new GetAllController()
const newItemController = new NewItemController()
const deleteItemController = new DeleteItemController()
const toggleItemController = new ToggleItemController()
const editItemController = new EditItemController()

app.get('/', getAllController.handle)
app.post('/', newItemController.handle)
app.delete('/', deleteItemController.handle)
app.patch('/', toggleItemController.handle)
app.patch('/edit', editItemController.handle)

app.listen(port, () => {
  console.log(`Server is online -> http://localhost:${port}`)
})
