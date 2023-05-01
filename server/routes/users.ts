import { signup, signin, getUser, updateUser, savePin, googleSignin, googleSignup, facebookSignin, facebookSignup, removeSavePin, getUsers, deleteUser } from '../controllers/users'
import express from 'express'
import auth from '../middleware/auth'

const router = express.Router()


router.get('/', getUsers)
router.get("/:id", getUser)
router.put("/:id", auth, updateUser)
router.put("/savePin/:id", auth, savePin)
router.put("/removeSavePin/:id", auth, removeSavePin)
router.delete("/:id", auth, deleteUser)

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/googleSignup", googleSignup)
router.post("/googleSignin", googleSignin)
router.post("/facebookSignup", facebookSignup)
router.post("/facebookSignin", facebookSignin)



export default router
