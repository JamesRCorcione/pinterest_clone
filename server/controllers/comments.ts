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
        const comments = await Comments.find({pinId: id}).sort({ createdAt: -1 })
  
        res.status(200).send(comments)
      } catch (error) {
        res.status(500).send("Error: " + error)
      }
  }
  
  export const getReplies = async (req: Request, res: Response) => {
    const { id } = req.params
  
    try {
        const replies = await Replies.find({parentId: id}).sort({ createdAt: -1 })
        

        res.status(200).json(replies)
    } catch (error) {
        res.status(404).json({ message: error })
    }
  }
  
  
  export const createComment = async (req: Request, res: Response) => {
    const { id } = req.params
    const { userCommenting, text, commentId} = req.body

  
    let data = { pinId: id, userCommenting, text, date: new Date(), hearts: [], totalHearts: 0, replies: [] }    
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

      const prev = await Comments.findById(replyId)
      
      let data = { pinId: id, parentId: commentId, userCommenting, text, date: new Date(), hearts: [], totalHearts: 0, taggedUser: prev?.userCommenting?.userName}

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

    console.log(userId)

    try {      
      await Comments.findByIdAndUpdate(commentId,
          {$push: {'hearts': userId}},  
          {$inc: {'totalHearts': 1 }}
        )
      //updatedComment?.save()
      res.status(200).send()
    } catch (error) {
      //console.log(error)
      res.status(500).json({ message: error })
    }
  }

 export const unheartCommentPin = async (req: Request, res: Response) => {
    const { id } = req.params
    const { commentId, userId, replyId } = req.body


    try {      
      await Comments.findByIdAndUpdate(commentId,
          {$pull: {'hearts': userId}},  
          {$inc: {'totalHearts': -1 }}
        )

      
      //updatedComment?.save()
      res.status(200).send()
    } catch (error) {
      //console.log(error)
      res.status(500).json({ message: error })
    }
  }

  export const heartReplyPin = async (req: Request, res: Response) => {
    const { id } = req.params
    const { commentId, userId, replyId } = req.body

  
    try {
      let updatedComment = await Comments.findById(commentId)
      const c = updatedComment?.replies
      c?.map((reply:any, i:number) => {
        if (reply._id.toString() === replyId) {          
          reply.hearts.push(userId)
          reply.totalHearts = reply.totalHearts + 1
        }
      })

      
      updatedComment?.save()
      res.status(200).send()
    } catch (error) {
      //console.log(error)
      res.status(500).json({ message: error })
    }
  }

  export const unheartReplyPin = async (req: Request, res: Response) => {
    const { id } = req.params
    const { commentId, userId, replyId } = req.body

  
    try {
      let updatedComment = await Comments.findById(commentId)
      console.log(updatedComment)
      const c = updatedComment?.replies
      c?.map((reply:any, i:number) => {
        if (reply._id.toString() === replyId) {       
          reply.hearts.pull(userId)
          reply.totalHearts = reply.totalHearts - 1
        }
        console.log(reply)
      })
      
      updatedComment?.save()
      res.status(200).send()
    } catch (error) {
      //console.log(error)
      res.status(500).json({ message: error })
    }
  }

  //Delete
export const deleteReply = async (req: Request, res: Response) => {
  const { commentId, replyId } = req.params

  console.log(commentId, replyId)

  try {    
    let updatedComment = await Comments.findById(commentId)
    updatedComment?.replies?.map((reply:any, i:number) =>  {
      if (reply._id.toString() === replyId) {
        updatedComment?.replies.splice(i, 1)
        console.log(updatedComment?.replies)
      }
    })
    
    updatedComment?.save()
    console.log(updatedComment?.replies.length)

    //if (!Comments) return res.status(404).send("Comment not found...")

    //const deletedComment = await Comments.findByIdAndDelete(req.params.id)

    res.send(updatedComment)
  } catch (error) {
    console.log(error)
    //res.status(500).json({ message: error })
  }  
}


export const updateReply = async (req: Request, res: Response) => {
  const { commentId, replyId } = req.params
  const { text } = req.body

  console.log(commentId, replyId, text)

  try {    
    let updatedComment = await Comments.findById(commentId)
    updatedComment?.replies?.map((reply:any, i:number) =>  {
      if (reply._id.toString() === replyId) {        
          //Cannot be undefined, no comment or button to click if thats the case
          updatedComment!.replies[i].text = text
      }
    })
    
    updatedComment?.save()
    //console.log(updatedComment?.replies.length)

    res.send(updatedComment)
  } catch (error) {
    console.log(error)
    //res.status(500).json({ message: error })
  }  
}


  //Delete
  export const deleteComment = async (req: Request, res: Response) => {
    const { commentId, replyId } = req.params
  
    console.log(commentId, replyId)
  
    try {    
      const updatedComment = await Comments.findByIdAndDelete(commentId)
     
  
      //if (!Comments) return res.status(404).send("Comment not found...")
  
      //const deletedComment = await Comments.findByIdAndDelete(req.params.id)
  
      res.send(updatedComment)
    } catch (error) {
      res.status(500).json({ message: error })
    }  
  }
  
  
  export const updateComment = async (req: Request, res: Response) => {
    const { commentId, replyId } = req.params
    const { text } = req.body
  
    console.log(commentId, replyId, text)
  
    try {    
      await Comments.findByIdAndUpdate(commentId, {text})      
      
  
      res.status(200).send()
    } catch (error) {
      res.status(500).json({ message: error })
    }  
  }
  