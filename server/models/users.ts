import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, minlength: 3, maxlength: 20 },
  image: { type: String, default: null},
  email: { type: String, required: true, minlength: 3, maxlength: 50 },
  password: { type: String, required: true, minlength: 3 },
  birthday: { type: Date, },
  saves: { type: [Object] },
})

const Users = mongoose.model('Users', userSchema)

export default Users