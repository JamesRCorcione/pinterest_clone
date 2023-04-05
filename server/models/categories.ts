import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    category: { type: String, required: true}
})

const Categories = mongoose.model('Categories', categorySchema)

export default Categories