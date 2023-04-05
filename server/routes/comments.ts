import { createComment, deleteComment, deleteReply, getComments, heartCommentPin, heartReplyPin, updateComment, updateReply } from '../controllers/comments'
import express from 'express'
import auth from '../middleware/auth.js'

const router = express.Router()
router.get('/:id', getComments)
router.post('/:id', createComment)
router.post('/heartCommentPin/:id', heartCommentPin)
router.post('/heartReplyPin/:id', heartReplyPin)

router.delete('/:commentId', deleteComment)
router.put('/:commentId', updateComment)

router.delete('/:commentId/deleteReply/:replyId', deleteReply)
router.put('/:commentId/updateReply/:replyId', updateReply)

export default router
