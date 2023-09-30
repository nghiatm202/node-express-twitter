import express from 'express'
import { defaultErrorHandler } from '~/middlewares/errors.middlewares'
import mediasRouter from '~/routes/medias.routes'
import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import { initFolder } from '~/utils/file'

const app = express()
const port = 8080

// Tạo folder upload
initFolder()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
databaseService.connect()

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
