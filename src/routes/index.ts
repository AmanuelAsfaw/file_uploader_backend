import { Router } from 'express'
import filesRouter from './filesRoute'

const router = Router()

router.use('/files', filesRouter)

export default router