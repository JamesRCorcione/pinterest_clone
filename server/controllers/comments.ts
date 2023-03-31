import { Request, Response } from 'express'
import crypto, { randomUUID } from 'crypto'
import Joi from 'joi'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

import Comments from '../models/comments'


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
  
  export const getComment = async (req: Request, res: Response) => {
    const { id } = req.params
  
    try {
        const comment = await Comments.findById(id)
        
        res.status(200).json(comment)
    } catch (error) {
        res.status(404).json({ message: error })
    }
  }
  
  
  export const createComment = async (req: Request, res: Response) => {
    const { id } = req.params
    const { userName, userImage, text, } = req.body
  
    let data = { pinId: id, userName, userImage, text, date: new Date(), hearts: 0, replies: [] }    
    const comment = new Comments(data)  

    comment.save()
    .then(comment => res.json({
        comment: comment
    }))
    .catch((err:any) => res.status(500).json({error: err}))     
  }
  
  
  export const createReply = async (req: Request, res: Response) => {
    const { id } = req.params
    const { commentId, userName, userImage, text } = req.body

    try {  
      let data = { pinId: id, parentId: commentId, userName, userImage, text, date: new Date(), hearts: 0, replies: [] }    
      const comment = new Comments(data)

      comment.save()

      const updatedComment = await Comments.findByIdAndUpdate(commentId,
        {$push: {'replies': comment}},
        { 'new': true },  
      )
  

      
      res.status(200).json({updatedComment})
    } catch (error) {
      res.status(500).json({ message: error })
    }
    
  }
  
    
    
