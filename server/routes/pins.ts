import { createPin, getPins, getPin, updatePin, deletePin, getPinsByCreator } from '../controllers/pins'
import express from 'express'

const router = express.Router()

router.post("/", createPin)
router.get("/", getPins)
router.get("/:id", getPin)
router.get("/user-created-pins/:id", getPinsByCreator)
router.put("/:id", updatePin)
router.delete("/:id", deletePin)


export default router
