import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, minlength: 3, maxlength: 20 },
  email: { type: String, required: true, minlength: 3, maxlength: 50 },
  password: { type: String, required: true, minlength: 3 },
  birthday: { type: Date, required: true,  },
})

const User = mongoose.model('Users', userSchema)

export default User