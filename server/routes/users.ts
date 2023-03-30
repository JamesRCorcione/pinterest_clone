import { signup, signin, getUser, savePin, googleSignin, googleSignup } from '../controllers/users'
import express from 'express'

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/googleSignup", googleSignup)
router.post("/googleSignin", googleSignin)
router.put("/:id", savePin)
router.get("/:id", getUser)

export default router
