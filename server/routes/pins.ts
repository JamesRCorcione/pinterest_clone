import { createPin, getPins, getPin, updatePin, deletePin, getPinsByCreator, getPinsByCategory, getSearchPins } from '../controllers/pins'
import express from 'express'
import auth from '../middleware/auth'

const router = express.Router()



router.post("/", auth, createPin)
router.get("/", auth, getPins)
router.get("/:id", getPin)
router.get("/user-created-pins/:id", getPinsByCreator)
router.get("/category/:category", getPinsByCategory)
router.get("/search/:searchTerm", getSearchPins)
router.put("/:id", updatePin)
router.delete("/:id", deletePin)


export default router
