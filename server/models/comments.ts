import { any } from 'joi'
import mongoose from 'mongoose'

const commentsSchema = new mongoose.Schema({    
        pinId: { type: mongoose.Schema.Types.ObjectId, default: null },
        parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
        userCommenting: { 
                userId: { type: mongoose.Schema.Types.ObjectId, default: null},
                userName: { type: String, default: null},
                userImage: { type: String, default: null},
        },
        text: { type: String, default: '' },
        hearts: { type: [mongoose.Schema.Types.ObjectId], default: [] },
        totalHearts: { type: Number, default: 0},
        replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }]
}, {timestamps: true})

const Comments = mongoose.model('Comments', commentsSchema)

export default Comments