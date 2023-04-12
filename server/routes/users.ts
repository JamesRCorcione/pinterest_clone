import { signup, signin, getUser, savePin, googleSignin, googleSignup, facebookSignin, facebookSignup, updateSaves } from '../controllers/users'
import express from 'express'
import auth from '../middleware/auth'

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/googleSignup", googleSignup)
router.post("/googleSignin", googleSignin)
router.post("/facebookSignup", facebookSignup)
router.post("/facebookSignin", facebookSignin)
router.put("/savePin/:id", auth, savePin)
router.put("/updateSaves/:id", auth, updateSaves)
router.get("/:id", getUser)

export default router
