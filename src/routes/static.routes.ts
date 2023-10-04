import { Router } from 'express'
import { serveImageController, serveVideoStreamingController } from '~/controllers/medias.controllers'

const staticRouter = Router()

staticRouter.get('/image/:name', serveImageController)
staticRouter.get('/video/:name', serveVideoStreamingController)

export default staticRouter
