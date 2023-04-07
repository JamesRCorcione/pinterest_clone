import { createPin, getPins, getPin, updatePin, deletePin, getPinsByCreator, getPinsByCategory, getSearchPins } from '../controllers/pins'
import express from 'express'
import auth from '../middleware/auth'

const router = express.Router()




router.get("/", getPins)
router.get("/:id", getPin)
router.get("/user-created-pins/:id", getPinsByCreator)
router.get("/category/:category", getPinsByCategory)
router.get("/search/:searchTerm", getSearchPins)
router.put("/:id", updatePin)
router.post("/", auth, createPin)
router.delete("/:id", auth, deletePin)


export default router
