import { createPin, getPins, getPin, updatePin, deletePin, getPinsByCreator, getPinsByTags, getSearchPins } from '../controllers/pins'
import express from 'express'
import auth from '../middleware/auth'

const router = express.Router()




router.get("/", getPins)
router.get("/:id", getPin)
router.get("/user-created-pins/:id", getPinsByCreator)
router.get("/tags/:tags", getPinsByTags)
router.get("/search", getSearchPins)
router.put("/:id", auth, updatePin)
router.post("/", auth, createPin)
router.delete("/:id", auth, deletePin)


export default router
