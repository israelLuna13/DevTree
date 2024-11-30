import express from 'express'
import 'dotenv/config'
import router from './router'
import {connectDB} from './config/db'
const app = express()


connectDB()
//enable read forms
app.use(express.json())
//routing
app.use('/',router)

export default app