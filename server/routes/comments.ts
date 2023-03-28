import { createComment, createReply, getComments } from '../controllers/comments'
import express from 'express'

const router = express.Router()
router.get('/:id', getComments)
router.post('/:id', createComment)
router.post('/reply/:id', createReply)

export default router
