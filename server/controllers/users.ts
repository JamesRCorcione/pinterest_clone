import { Request, Response } from 'express'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import crypto from 'crypto'
import Joi from 'joi'

import User from '../models/users'
import Pins from '../models/pins'

dotenv.config()

export const signup = async (req: Request, res: Response) => {
  try {   
      const { userName, email, password, birthday, saves, uid } = req.body

      const oldUser = await User.findOne({ email })

      if (oldUser) return res.status(400).json({ message: "User already exists" })
  
      const hashedPassword = await bcrypt.hash(password, 12)

      const result = await User.create({ userName, email, password: hashedPassword, birthday, saves, uid })

      const token = jwt.sign( { userName: result.userName, id: result._id }, '72b75dee48278c05eeb945d6899d83d5', { expiresIn: "1h" } )

      res.status(201).json({ result, token })
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

    const token = jwt.sign({ userName: oldUser.userName, id: oldUser._id }, '72b75dee48278c05eeb945d6899d83d5', { expiresIn: "1h" })

    res.status(200).json({ result: oldUser, token })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

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
  const pin = req.body

  try {
      const updatedUser = await User.findByIdAndUpdate(id,
          {$push: {'saves': pin}},
          { 'new': true },  
        )

      res.status(200).json(updatedUser)
  } catch (error) {
      res.status(404).json({ message: error })
  }
}