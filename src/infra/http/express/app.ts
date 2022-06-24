import express from 'express'
import cors from 'cors'
import { Routes } from '../routes/index'

const routes = new Routes().routes
const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(routes)

export default app
