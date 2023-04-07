import { Request, Response } from 'express'
import Joi from 'joi'

import Categories from '../models/categories'


//Create
export const createCategory = async (req: Request, res: Response) => {
    try {    
        const { category } = req.body

        let newCategory = new Categories({ category })
    
        await newCategory.save()
        res.send(newCategory)
      } catch (error) {
        res.status(500).send(error)
      }
}

//Retreive
export const getCategories = async (req: Request, res: Response) => {
    try {
        //Need to use .limit() on find to reduce load in...
        const categories = await Categories.find().sort({ date: -1 })
        res.send(categories)
      } catch (error) {
        res.status(500).send("Error: " + error)
      }
}


export const getSearchCategories = async (req: Request, res: Response) => {
  const { searchTerm } = req.params
  try {
      const categories = await Categories.find({ category: { "$regex": searchTerm, "$options": "i" } })
      
      res.status(200).json(categories)
  } catch (error) {
      res.status(404).json({ message: error })
  }
}

//Update
export const updateCategory = async (req: Request, res: Response) => {   
      const categoryCheck = await Categories.findById(req.params.id)
    
      if (!categoryCheck) return res.status(404).send("Category not found...")
    
      const { category } = req.body
    
      const updatedCategory = await Categories.findByIdAndUpdate(
        req.params.id,
        { category },
      )
    
      res.send(updatedCategory)
}

//Delete
export const deleteCategory = async (req: Request, res: Response) => {
    const categoryCheck = await Categories.findById(req.params.id)

  if (!categoryCheck) return res.status(404).send("Category not found...")

  const deletedCategory = await Categories.findByIdAndDelete(req.params.id)

  res.send(deletedCategory)
}


