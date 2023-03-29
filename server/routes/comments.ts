import { createComment, createReply, getComments } from '../controllers/comments'
import express from 'express'
import auth from '../middleware/auth.js'

const router = express.Router()
router.get('/:id', getComments)
router.post('/:id', auth, createComment)
router.post('/reply/:id', auth, createReply)

export default router
