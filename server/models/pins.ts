import mongoose from 'mongoose'

const pinSchema = new mongoose.Schema({
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    title: { type: String },
    text: { type: String },
    tags: { type: [String] },
    image: { type: String, required: true},
    destination: { type: String },
})

const Pins = mongoose.model('Pins', pinSchema)

export default Pins

//postedBy: {
//userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//userName: { type: String },
//image: { type: String },
//}