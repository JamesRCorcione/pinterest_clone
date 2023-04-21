import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import users from './routes/users'
import pins from './routes/pins'
import comments from './routes/comments'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/pins', pins)
app.use('/api/users', users)
app.use('/api/comments', comments)

app.get('/', async (req:any, res:any) => {
  res.send('welcome...')
})

const uri = process.env.ATLAS_URI || ''
const port = process.env.PORT

const startServer = async () => {
  mongoose.set('strictQuery', false)
  mongoose.connect(uri)
    .then(() => app.listen(port, () => console.log(`⚡️[server]: Server is running at https://pinterestclone.onrender.com/`)))
    .catch((error:any) => console.log(`${error} did not connect`))
}

startServer()