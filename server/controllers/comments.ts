import { Request, Response } from 'express'
import crypto, { randomUUID } from 'crypto'
import Joi from 'joi'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

import Comments from '../models/comments'
import User from '../models/users'
import mongoose from 'mongoose'
import Replies from '../models/replies'


//Comments
//Retreive
export const getComments = async (req: Request, res: Response) => {
  const { id } = req.params
    try {
        const comments = await Comments.find({pinId: id}).sort({ date: -1 })
  
        res.status(200).send(comments)
      } catch (error) {
        res.status(500).send("Error: " + error)
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
  
  
  export const createComment = async (req: Request, res: Response) => {
    const { id } = req.params
    const { userCommenting, text, commentId} = req.body

  
    let data = { pinId: id, userCommenting, text, date: new Date(), hearts: [], replies: [] }    
    const comment = new Comments(data)  

    comment.save()
    .then(comment => res.json({
        comment: comment
    }))
    .catch((err:any) => res.status(500).json({error: err}))     
  }
  
  
  export const createReply = async (req: Request, res: Response) => {
    const { id } = req.params
    const { commentId, replyId, userCommenting, text} = req.body
    try {
      console.log()

      const prev = await Comments.findById(replyId)
      
      let data = { pinId: id, parentId: commentId, userCommenting, text, date: new Date(), hearts: [], taggedUser: prev?.userCommenting?.userName}

      const reply = new Replies(data)

      reply.save()

      const updatedComment = await Comments.findByIdAndUpdate(commentId,
        {$push: {'replies': reply}},
      )


      res.status(200).json({updatedComment})
    } catch (error) {
      
      res.status(500).json({ message: error })
    }    
  }
  

  export const heartCommentPin = async (req: Request, res: Response) => {
    const { id } = req.params
    const { commentId, userId, replyId } = req.body

    console.log('check', commentId, userId, replyId)
  
    try {
      let updatedComment = await Comments.findById(commentId)
      const c = updatedComment?.replies
      c?.map((reply, i) => {
        if (reply._id.toString() === replyId) {          
          reply.hearts.push(userId)
          console.log('mapy',i,reply)
        }
      })
      
      updatedComment?.save()
      res.status(200).json({updatedComment})
    } catch (error) {
      //console.log(error)
      //res.status(500).json({ message: error })
    }
  }