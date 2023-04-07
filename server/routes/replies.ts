import { createReply, getReplies, getReply, heartRepliesPin } from '../controllers/replies'
import express from 'express'
import auth from '../middleware/auth'

const router = express.Router()
router.get('/:id', getReplies)
router.get('/reply/:id', getReply)
router.post('/createReply/:id', auth, createReply)
router.post('/heartRepliesPin/:id', auth, heartRepliesPin)

export default router
