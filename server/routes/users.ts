import { signup, signin, getUser, savePin } from '../controllers/users'
import express from 'express'

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.put("/:id", savePin)
router.get("/:id", getUser)

export default router
