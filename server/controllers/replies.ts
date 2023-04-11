import { Request, Response } from 'express'
import crypto, { randomUUID } from 'crypto'
import Joi from 'joi'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

import User from '../models/users'
import mongoose from 'mongoose'
import Replies from '../models/replies'
import Comments from '../models/comments'

export const createReply = async (req: Request, res: Response) => {
  const { id } = req.params
  const { commentId, replyId, userCommenting, text } = req.body


  try {        
    const prev = await Replies.findById(replyId)

    console.log(prev)
    
    let data = { pinId: id, parentId: commentId, userCommenting, text, hearts: [], taggedUser: { _id: prev?.userCommenting?.userId, userName: prev?.userCommenting?.userName } }

    const reply = new Replies(data)
    reply.save()

    console.log(reply)

    const updatedComment = await Comments.findByIdAndUpdate(commentId,
      {$push: {'replies': reply}},
      { 'new': true },  
    )  
    res.status(200).json({reply})
  } catch (error) {    
    res.status(500).json({ message: error })
  }
  
}

  export const getReplies = async (req: Request, res: Response) => {
    const { id } = req.params  
    try {
        const replies = await Replies.find({parentId: id}).sort({ date: -1 })

        res.status(200).json(replies)
    } catch (error) {
        res.status(404).json({ message: error })
    }
  }

  export const getReply = async (req: Request, res: Response) => {
    const { id } = req.params
  
    try {
        const reply = await Replies.findById(id)        

        res.status(200).json(reply)
    } catch (error) {
        res.status(404).json({ message: error })
    }
  }

  export const heartRepliesPin = async (req: Request, res: Response) => {
    const { id } = req.params
    const { commentId, userId, replyId } = req.body

  
    try {        
      let updatedComment = await Replies.findByIdAndUpdate(replyId,
        {$push: {'hearts': userId}},
        { 'new': true },
      )

      res.status(200).json({updatedComment})
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
    
    
