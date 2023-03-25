// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

declare module 'react-file-base64'


//Users
interface IUser {
  _id?: mongoose.Types.ObjectId
  userName: string
  image: string
  email: email
  password: string
  birthday: Date | null
  saves: IPin[]
}

interface IUsers {
  users: IUser[]
  userStatus: string
  userError: string
}

interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, any>
}

interface IPin {
  _id?: mongoose.Types.ObjectId,
  postedBy: {
    userId: mongoose.Types.ObjectId
    userName: String
    image: null
  },
  title: String,
  text: String
  image: string,  
  destination: String,
}

interface IPins {
  pins: IPin[]
}

interface PinProps {
  pin: IPin
}

interface SavePinProps {
  id: mongoose.Types.ObjectId,
  pin: IPin
}