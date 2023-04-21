import { createComment, createReply, deleteComment, deleteReply, getComments, heartCommentPin, heartReplyPin, unheartCommentPin, unheartReplyPin, updateComment, updateReply } from '../controllers/comments'
import express from 'express'
import auth from '../middleware/auth.js'

const router = express.Router()
router.get('/:id', getComments)
router.post('/:id', createComment)
router.put('/heartCommentPin/:id', heartCommentPin)
router.put('/unheartCommentPin/:id', unheartCommentPin)
router.put('/heartReplyPin/:id', heartReplyPin)
router.put('/unheartReplyPin/:id', unheartReplyPin)

router.delete('/:commentId', deleteComment)
router.put('/:commentId', updateComment)

router.post('/createReply/:id', createReply)
router.delete('/:commentId/deleteReply/:replyId', deleteReply)
router.put('/:commentId/updateReply/:replyId', updateReply)

export default router
