import { any } from 'joi'
import mongoose from 'mongoose'

const commentsSchema = new mongoose.Schema({    
        pinId: { type: mongoose.Schema.Types.ObjectId, default: null },
        parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
        username: { type: String, default: 'Anon' },
        date: { type: Date, default: new Date() },
        text: { type: String, default: '' },
        hearts: { type: Number, default: 0 },
        replies: { type: [this], default: [] }
}, {timestamps: true})

const Comments = mongoose.model('Comments', commentsSchema)

export default Comments