import mongoose from 'mongoose'

const pinSchema = new mongoose.Schema({
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: { type: String },
    text: { type: String },
    image: { type: String, required: true},  
    destination: { type: String },
})

const Pins = mongoose.model('Pins', pinSchema)

export default Pins