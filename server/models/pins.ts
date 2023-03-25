import mongoose from 'mongoose'

const pinSchema = new mongoose.Schema({
    postedBy: { 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        userName: { type: String },
        image: { type: String },        
    },
    title: { type: String },
    text: { type: String },
    image: { type: String, required: true},  
    destination: { type: String },
})

const Pins = mongoose.model('Pins', pinSchema)

export default Pins