import { Request, Response } from 'express'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import crypto from 'crypto'
import Joi from 'joi'
import path from 'path'

import User from '../models/users'
import Pins from '../models/pins'

dotenv.config()
const secret = process.env.SECRET as string

export const getUser = async (req: Request, res: Response) => { 
  const { id } = req.params


  try {
      const user = await User.findById(id)
      res.status(200).json(user)
  } catch (error) {
      res.status(404).json({ message: error })
  }
}

export const savePin = async (req: Request, res: Response) => { 
  const { id } = req.params
  const {user, pin} = req.body

  try {
      const updatedUser = await User.findByIdAndUpdate(id,
          {$push: {'saves': pin}},
          { new: true }
        )

      res.status(200).json({ result: updatedUser, token: user.token, authType: user.authType })
  } catch (error) {
      res.status(404).json({ message: error })
  }
}

export const removeSavePin = async (req: Request, res: Response) => { 
  const { id } = req.params
  const {user, pin} = req.body 

  try {
      const updatedUser = await User.findByIdAndUpdate(user.result._id, 
        {$pull: {'saves': pin}},
        { 'new': true },  
        )


      res.status(200).json({ result: updatedUser, token: user.result.token, authType: user.result.authType })
  } catch (error) {
      res.status(404).json({ message: error })
  }
}

export const signup = async (req: Request, res: Response) => {
  try {   
      const { userName, email, password, birthday, saves, uid } = req.body

      const emailSchema = Joi.string().email()
      const { error } = emailSchema.validate(email)    
      if (error) return res.status(400).send({ message: 'Please Enter a valid Email!' })

      const oldUser = await User.findOne({ email })

      if (oldUser) return res.status(400).json({ message: "User already exists" })
  
      const hashedPassword = await bcrypt.hash(password, 12)

      const result = await User.create({ userName, email, password: hashedPassword, birthday, saves, uid })

      const secret = process.env.SECRET as string
      const token = jwt.sign( { userName: result.userName, id: result._id }, secret, { expiresIn: "1h" } )

      res.status(201).json({ result, token, authType: 'Custom' })
    } catch (error) {
      res.status(500).send(error)
    }
}

export const signin = async (req: Request, res: Response) => {
  const { userName, password } = req.body


  try {
    const oldUser = await User.findOne({ userName })

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })
    
    const token = jwt.sign({ userName: oldUser?.userName, id: oldUser?._id }, secret, { expiresIn: "1h" })

    res.status(200).json({ result: oldUser, token, authType: 'Custom' })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const googleSignup = async (req: Request, res: Response) => {
  const { email, given_name, family_name, picture, sub, exp } = req.body
  const password = 'terst'


  try {
    const oldUser = await User.findOne({ email })

    if (oldUser) return res.status(400).json({ message: "User already exists" })
  
    const result = await User.create({ email, password: 'N/A', userName: `${family_name} ${given_name}`, image: picture })

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } )

    res.status(201).json({ result, token, authType: 'Google' })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })    
  }
}

export const googleSignin = async (req: Request, res: Response) => {
  const { email, sub, exp } = req.body

  try {
    const oldUser = await User.findOne({ email })

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })

    const token = jwt.sign( { email: email, id: sub }, secret, { expiresIn: "1h" } )

    res.status(200).json({ result: oldUser, token, authType: 'Google' })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const facebookSignup = async (req: Request, res: Response) => {
  const { email, name, picture, id } = req.body

  try {
    const oldUser = await User.findOne({ email })

    if (oldUser) return res.status(400).json({ message: "User already exists" })
  
    const result = await User.create({ email, password: 'N/A', userName: name, image: picture.data.url })
    const token = jwt.sign( { email: email, id }, secret, { expiresIn: "1h" } )

    res.status(201).json({ result, token, authType: 'Facebook' })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })    
  }
}

export const facebookSignin = async (req: Request, res: Response) => {
  const { email, id } = req.body

  try {
    const oldUser = await User.findOne({ email })

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })
    const token = jwt.sign( { email: email, id }, secret, { expiresIn: "1h" } )

    res.status(200).json({ result: oldUser, token, authType: 'Facebook' })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
  
        res.status(200).send(users)
      } catch (error) {
        res.status(500).send("Error: " + error)
      }
  }

export const updateUser = async (req: Request, res: Response) => {
  //const { userName, password, image } = req.body
  //const schema = Joi.object({
  //  task: Joi.string().min(3).max(300).required(),
  //  isComplete: Joi.boolean(),
  //  date: Joi.date(),
  //});
  //const { error } = schema.validate(req.body)
  //if (error) return res.status(400).send(error.details[0].message)
  console.log(typeof(req.params.id))
  try {    
  
    const user = await User.findById(req.params.id)  
    if (!user) return res.status(404).send("Post not found...")  

    const { userName, password, image, authType } = req.body
    let result

    // All combinations that can be updated
    if (userName && password && image) {
      const hashedPassword = await bcrypt.hash(password, 12)
      result = await User.findByIdAndUpdate( req.params.id, { userName, password: hashedPassword, image })
    } else if (userName && password) {
      const hashedPassword = await bcrypt.hash(password, 12)
      result = await User.findByIdAndUpdate( req.params.id, { userName, password: hashedPassword })
    } else if (userName && image) {
      result = await User.findByIdAndUpdate( req.params.id, { userName, image })
    } else if (image && password) {
      const hashedPassword = await bcrypt.hash(password, 12)
      result = await User.findByIdAndUpdate( req.params.id, { password: hashedPassword, image })
    } else if (userName) {
      result = await User.findByIdAndUpdate( req.params.id, { userName })
    } else if (image) {
      result = await User.findByIdAndUpdate( req.params.id, { image })
    } else if (password) {
      const hashedPassword = await bcrypt.hash(password, 12)
      result = await User.findByIdAndUpdate( req.params.id, { password: hashedPassword })
    }
    
    const secret = process.env.SECRET as string
    const token = jwt.sign( { userName, id: req.params.id }, secret, { expiresIn: "1h" } )
    
    res.status(200).json({ result, token, authType: 'Custom' })
  } catch (err) {
    console.log(err)
    // /res.status(500).json({ message: "Something went wrong" })
  }
}


//Delete
export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id)

  if (!user) return res.status(404).send("Pin not found...")

  const deletedPost = await User.findByIdAndDelete(req.params.id)

  res.send(deletedPost)
}