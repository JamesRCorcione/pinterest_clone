import { Request, Response } from 'express'
import crypto, { randomUUID } from 'crypto'
import Joi from 'joi'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

import Pin from '../models/pins'
import mongoose from 'mongoose'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


interface middlewareRequest extends Request {
  headers: {
      authorization: string 
  },
  userId: string
}

//Create
export const createPin = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
          title: Joi.string().required(),
          text: Joi.string().required(),
          image: Joi.required(),
        })
    
        const { title, text, tags, creatorId, totalComments, image, destination } = req.body
        const { error } = schema.validate({title, text, image})   
        if (error) return res.status(400).send({ message: error?.details[0].message })
    
        const selectedFileURL = await cloudinary.uploader.upload(image)

        //let initComments = new Comments()         
        //initComments = await initComments.save()
    
        let pin = new Pin({ title, text, tags, creatorId, totalComments, image: selectedFileURL.secure_url, destination })


        pin = await pin.save()
        res.send(pin)
      } catch (error) {
        res.status(500).send(error)
      }
}

//Retreive
export const getPins = async (req: Request, res: Response) => {
    const { startIndex } = req.query
    console.log(startIndex)
    try {
      //Missed timestamps on my pin Model so sorting is not working with 
      //current temp mock up.... must fix before finished  
      //const pins = await Pin.find().sort({ timestamp: 'desc' }).limit(Number(startIndex))//.skip(Number(startIndex))
      const pins = await Pin.find().sort({ timestamps: -1 }).limit(Number(startIndex))//.skip(Number(startIndex))
      console.log(pins)
        res.send(pins)
      } catch (error) {
        res.status(500).send("Error: " + error)
      }
}

export const getPinsByCreator = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
      const objectId = new mongoose.Types.ObjectId(id)

      const createdPins = await Pin.aggregate([
        {'$match': { 'creatorId': objectId}}
      ]).exec()      

      res.status(200).json(createdPins)
  } catch (error) {
      res.status(404).json({ message: error })
  }
}


export const getPinsByTags = async (req: Request, res: Response) => {
  const { tags } = req.params

  try {
      const taggedPins = await Pin.aggregate([
        {'$match': { 'tags': tags}}
      ]).exec()      


      res.status(200).json(taggedPins)
  } catch (error) {
      res.status(404).json({ message: error })
  }
}

export const getPin = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
      const pin = await Pin.findById(id)
      
      res.status(200).json(pin)
  } catch (error) {
      res.status(404).json({ message: error })
  }
}

export const getSearchPins = async (req: Request, res: Response) => {
  const { query } = req.query
  try {
      //const creatorUserName = await User.findById(creatorId)
      const pins = await Pin.find({
        $or:[
          {title: { "$regex": query, "$options": "i" }},
          {text: { "$regex": query, "$options": "i" }},
          {tags: { "$regex": query, "$options": "i" }},
          {destination: { "$regex": query, "$options": "i" }},
          {'postedBy.userName': { "$regex": query, "$options": "i" }},
      ]})
      
      res.status(200).json(pins)
  } catch (error) {
      res.status(404).json({ message: error })
  }
}

//Update
export const updatePin = async (req: Request, res: Response) => {
    const schema = Joi.object({
        task: Joi.string().min(3).max(300).required(),
        isComplete: Joi.boolean(),
        date: Joi.date(),
      });
    
      //const { error } = schema.validate(req.body)
    
      //if (error) return res.status(400).send(error.details[0].message)
    
      const post = await Pin.findById(req.params.id)
    
      if (!post) return res.status(404).send("Post not found...")
    
      const { title, text, creator, tags, selectedFile, votes, createdAt, uid } = req.body
    
      const updatedPost = await Pin.findByIdAndUpdate(
        req.params.id,
        { title, text, creator, tags, selectedFile, votes, createdAt, uid },
        { new: true }
      )
    
      res.send(updatedPost)
}

//Delete
export const deletePin = async (req: Request, res: Response) => {
  const pin = await Pin.findById(req.params.id)

  if (!pin) return res.status(404).send("Pin not found...")

  const deletedPost = await Pin.findByIdAndDelete(req.params.id)

  res.send(deletedPost)
}


