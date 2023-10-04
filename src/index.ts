import { config } from 'dotenv'
import express from 'express'
import { defaultErrorHandler } from '~/middlewares/errors.middlewares'
import mediasRouter from '~/routes/medias.routes'
import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import { initFolder } from '~/utils/file'
import staticRouter from './routes/static.routes'

config()

const app = express()
const port = process.env.PORT || 5000

// Tạo folder upload
initFolder()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())

app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)

databaseService.connect()

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
