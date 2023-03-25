import { Request, Response } from 'express'
import crypto, { randomUUID } from 'crypto'
import Joi from 'joi'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

import Pin from '../models/pins'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


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
    
        const { title, text, postedBy, image, destination } = req.body
        const selectedFileURL = await cloudinary.uploader.upload(image)


        //let initComments = new Comments()         
        //initComments = await initComments.save()
    
        let pin = new Pin({ title, text, postedBy, image: selectedFileURL.secure_url, destination })
    
        pin = await pin.save()
        res.send(pin)
      } catch (error) {
        console.log(error)
        res.status(500).send(error)
      }
}

//Retreive
export const getPins = async (req: Request, res: Response) => {

    try {
        const posts = await Pin.find().sort({ date: -1 })
        res.send(posts)
      } catch (error) {
        res.status(500).send("Error: " + error)
      }
}

export const getPin = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
      const post = await Pin.findById(id)
      
      res.status(200).json(post)
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
    const post = await Pin.findById(req.params.id)

  if (!Pin) return res.status(404).send("Post not found...")

  const deletedPost = await Pin.findByIdAndDelete(req.params.id)

  res.send(deletedPost)
}