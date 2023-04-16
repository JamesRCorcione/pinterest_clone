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
          task: Joi.string().min(3).max(300).required(),
          isComplete: Joi.boolean(),
          date: Joi.date(),
        })
    
        //const { error } = schema.validate(req.body)
    
        //if (error) return res.status(400).send(error.details[0].message)
    
        const { title, text, tags, creatorId, postedBy, image, destination } = req.body
        const selectedFileURL = await cloudinary.uploader.upload(image)


        //let initComments = new Comments()         
        //initComments = await initComments.save()
    
        let pin = new Pin({ title, text, tags, creatorId, postedBy, image: selectedFileURL.secure_url, destination })


        pin = await pin.save()
        res.send(pin)
      } catch (error) {
        res.status(500).send(error)
      }
}

//Retreive
export const getPins = async (req: Request, res: Response) => {
    try {
        //Need to use .limit() on find to reduce load in...
        const pins = await Pin.find().sort({ timestamp: -1 })
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
  //const { searchTerm } = req.query
  const searchTerm = ''
  console.log('controller',req)
  try {
      const pins = await Pin.find({
        $or:[
          {title: { "$regex": searchTerm, "$options": "i" }},
          {text: { "$regex": searchTerm, "$options": "i" }},
          {tags: { "$regex": searchTerm, "$options": "i" }},
          {destination: { "$regex": searchTerm, "$options": "i" }},
          {'postedBy.userName': { "$regex": searchTerm, "$options": "i" }},
      ]})
      
      res.status(200).json(pins)
  } catch (error) {
    console.log('failed controller')
      //res.status(404).json({ message: error })
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
    const post = await Pin.findById(req.params.id)

  if (!Pin) return res.status(404).send("Post not found...")

  const deletedPost = await Pin.findByIdAndDelete(req.params.id)

  res.send(deletedPost)
}


