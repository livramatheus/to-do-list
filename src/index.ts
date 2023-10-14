import 'reflect-metadata'
import './shared/container'
import express, { Application } from 'express'
import GetAllController from './modules/todo/useCase/getAll/GetAllController'
import NewItemController from './modules/todo/useCase/newItem/NewItemController'
import DeleteItemController from './modules/todo/useCase/deleteItem/DeleteItemController'

const app: Application = express()
const port = process.env.PORT || 8000

app.use(express.json())

const getAllController = new GetAllController()
const newItemController = new NewItemController()
const deleteItemController = new DeleteItemController()

app.get('/', getAllController.handle)
app.post('/', newItemController.handle)
app.delete('/', deleteItemController.handle)

app.listen(port, () => {
  console.log(`Server is online -> http://localhost:${port}`)
})
