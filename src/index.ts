import 'reflect-metadata'
import './shared/container'
import express, { Application } from 'express'
import GetAllController from './modules/todo/useCase/getAll/GetAllController'
import NewItemController from './modules/todo/useCase/newItem/NewItemController'

const app: Application = express()
const port = process.env.PORT || 8000

app.use(express.json())

const getAllController = new GetAllController()
const newItemController = new NewItemController()

app.get('/', getAllController.handle)
app.post('/', newItemController.handle)

app.listen(port, () => {
  console.log(`Server is online -> http://localhost:${port}`)
})
