import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import {connectDB} from './config/db'
import { corsConfig } from './config/cors'

connectDB()

const app = express()

//cors 
app.use(cors(corsConfig))

//enable read forms
app.use(express.json())
//routing
app.use('/',router)

export default app