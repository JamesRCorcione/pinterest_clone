import { createReply, getReplies, getReply, heartRepliesPin } from '../controllers/replies'
import express from 'express'
import auth from '../middleware/auth.js'

const router = express.Router()
router.get('/:id', getReplies)
router.get('/reply/:id', getReply)
router.post('/createReply/:id', createReply)
router.post('/heartRepliesPin/:id', heartRepliesPin)

export default router
