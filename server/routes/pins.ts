import { createPin, getPins, getPin, updatePin, deletePin } from '../controllers/pins'
import express from 'express'

const router = express.Router()

router.post("/", createPin)
router.get("/", getPins)
router.get("/:id", getPin)
router.put("/:id", updatePin)
router.delete("/:id", deletePin)


export default router
