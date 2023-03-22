import { signup, signin } from '../controllers/users'
import express from 'express'

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)

export default router
