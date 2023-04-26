import { createComment, createReply, deleteComment, deleteReply, getComments, heartCommentPin, unheartCommentPin, updateComment, updateReply } from '../controllers/comments'
import express from 'express'
import auth from '../middleware/auth'

const router = express.Router()

router.get('/:id', getComments)
router.post('/:id', auth, createComment)
router.delete('/:commentId', auth, deleteComment)
router.put('/:commentId', auth, updateComment)

router.post('/createReply/:id', auth, createReply)
router.delete('/:commentId/deleteReply/:replyId', auth, deleteReply)
router.put('/:commentId/updateReply/:replyId', auth, updateReply)

router.put('/heartCommentPin/:id', auth, heartCommentPin)
router.put('/unheartCommentPin/:id', auth, unheartCommentPin)

export default router
