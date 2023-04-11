import { any } from 'joi'
import mongoose from 'mongoose'

const repliesSchema = new mongoose.Schema({    
        pinId: { type: mongoose.Schema.Types.ObjectId, default: null },
        parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
        userCommenting: { 
                userId: { type: mongoose.Schema.Types.ObjectId, default: null},
                userName: { type: String, default: null},
                userImage: { type: String, default: null},
        },
        taggedUser: { 
                _id: { type: mongoose.Schema.Types.ObjectId, default: null },
                userName: { type: String, default: null },
        },
        text: { type: String, default: '' },
        hearts: { type: [mongoose.Schema.Types.ObjectId], default: [] },
}, {timestamps: true})

const Replies = mongoose.model('Replies', repliesSchema)

export default Replies