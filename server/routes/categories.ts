import { createCategory, deleteCategory, getCategories, getSearchCategories, updateCategory } from '../controllers/categories'
import express from 'express'

const router = express.Router()

router.post("/", createCategory)
router.get("/", getCategories)
router.get("/search/:searchTerm", getSearchCategories)
router.put("/:id", updateCategory)
router.delete("/:id", deleteCategory)


export default router
