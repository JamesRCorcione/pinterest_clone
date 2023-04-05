import { createComment, getComments, heartCommentPin } from '../controllers/comments'
import express from 'express'
import auth from '../middleware/auth.js'

const router = express.Router()
router.get('/:id', getComments)
router.post('/:id', createComment)
router.post('/heartCommentPin/:id', heartCommentPin)

export default router
