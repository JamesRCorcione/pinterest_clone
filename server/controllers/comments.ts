import { Request, Response } from 'express'
import Joi from 'joi'
import Comments from '../models/comments'

//Comments
//Create
export const createComment = async (req: Request, res: Response) => {
  const { id } = req.params
  const { commentingUserId, text, commentId} = req.body

  //commentId ===> parentId

  let data = { pinId: id, commentingUserId, text, hearts: [], totalHearts: 0, replies: [] }    
  const comment = new Comments(data)  

  comment.save()
  .then(comment => res.json({
      comment: comment
  }))
  .catch((err:any) => res.status(500).json({error: err}))     
} 

//Retreive
export const getComments = async (req: Request, res: Response) => {
  const { id } = req.params
    try {
        const comments = await Comments.find().sort({ createdAt: -1 })
  
        res.status(200).send(comments)
      } catch (error) {
        res.status(500).send("Error: " + error)
      }
}

export const getCommentsByPin = async (req: Request, res: Response) => {
  const { id } = req.params
    try {
        const comments = await Comments.find({pinId: id}).sort({ createdAt: -1 })
  
        res.status(200).send(comments)
      } catch (error) {
        res.status(500).send("Error: " + error)
      }
}

//Update
export const updateComment = async (req: Request, res: Response) => {
    const { commentId, replyId } = req.params
    const { text } = req.body
    console.log(text)

    try {
      await Comments.findByIdAndUpdate(commentId, {text})      
      
  
      res.status(200).send()
    } catch (error) {
      res.status(500).json({ message: error })
    }  
}

//Delete
export const deleteComment = async (req: Request, res: Response) => {
      const { commentId, replyId } = req.params
      
      try {    
        let updatedComment = await Comments.findById(commentId)
        updatedComment?.replies.map(async (replyId:any, i:number) => {
          await Comments.findByIdAndDelete(replyId)
        })
       
    
        //if (!Comments) return res.status(404).send("Comment not found...")
    
        //const deletedComment = await Comments.findByIdAndDelete(req.params.id)
    
        updatedComment = await Comments.findByIdAndDelete(commentId)
        res.send(updatedComment)
      } catch (error) {
        res.status(500).json({ message: error })
      }  
}    

//Heart Pin
export const heartCommentPin = async (req: Request, res: Response) => {
    const { id } = req.params
    const { commentId, userId, replyId } = req.body


    try {      
      await Comments.findByIdAndUpdate(commentId,
          {$push: {'hearts': userId}},  
          {$inc: {'totalHearts': 1 }}
        )
      //updatedComment?.save()
      res.status(200).send()
    } catch (error) {
      res.status(500).json({ message: error })
    }
}

//Unheart Pin
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
      res.status(500).json({ message: error })
    }
}

//Replies need to be pushed into Head Comments array, is easier and cleaner to have seperate api
//Doesn't need a retrieval method because they are of type Comment model object and retrieved with them

//Create
export const createReply = async (req: Request, res: Response) => {
  const { id } = req.params
  const { commentId, taggedUser, replyId, commentingUserId, text} = req.body
  try {

    const prev = await Comments.findById(replyId)
    
    let data = { pinId: id, parentId: commentId, commentingUserId, text, hearts: [], taggedUser }

    const reply = new Comments(data)
    reply.save()      

    const updatedComment = await Comments.findByIdAndUpdate(commentId,
      {$push: {'replies': reply}},
      { 'new': true },  
    ) 

    res.status(200).json({reply: reply})
  } catch (error) {
    
    res.status(500).json({ message: error })
  }    
}

//Update
export const updateReply = async (req: Request, res: Response) => {
  const { commentId, replyId } = req.params
  const { text } = req.body

  try {    
    let updatedComment = await Comments.findById(commentId)
    //updatedComment?.replies?.map((reply:any, i:number) =>  {
    //  if (reply._id.toString() === replyId) {        
    //      //Cannot be undefined, no comment or button to click if thats the case
    //      Replies.findByIdAndUpdate(replyId,
    //        {text})
    //  }
    //})
    
    updatedComment?.save()

    res.send(updatedComment)
  } catch (error) {
    res.status(500).json({ message: error })
  }  
}

//Delete
export const deleteReply = async (req: Request, res: Response) => {
    const { commentId, replyId } = req.params
  
    try {    
      let updatedComment = await Comments.findById(commentId)
      updatedComment?.replies?.map((reply:any, i:number) =>  {
        if (reply._id.toString() === replyId) {
          updatedComment?.replies.splice(i, 1)
        }
      })
      
      updatedComment?.save()
  
      //if (!Comments) return res.status(404).send("Comment not found...")
  
      //const deletedComment = await Comments.findByIdAndDelete(req.params.id)
  
      res.send(updatedComment)
    } catch (error) {
      res.status(500).json({ message: error })
    }  
}
