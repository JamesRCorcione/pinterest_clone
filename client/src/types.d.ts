// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>
type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

declare module 'react-file-base64'

declare global {
  namespace Express {
      export interface Request {
          userId?: String;
          authorization?: String          
      }
  }
}


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
  creatorId: mongoose.Types.ObjectId
  postedBy: {
    userId: mongoose.Types.ObjectId
    userName: String
    image: null
  },
  title: String,
  text: String
  tags: String[]
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
  user: {
    result: IUser  
  }
  pin: IPin
}

interface IComment {
  _id?: mongoose.Types.ObjectId,
  pinId: mongoose.Types.ObjectId
  parentId: mongoose.Types.ObjectId
  userCommenting : {
    userId: mongoose.Types.ObjectId
    userName: String
    userImage: String
  }  
  taggedUser: String
  text: String
  hearts: mongoose.Types.ObjectId[]
  totalHeart: Number
  replies: mongoose.Types.ObjectId[]
}

interface IComments {
  comments: IComment[]
}

interface IReply {
  _id?: mongoose.Types.ObjectId,
  pinId: mongoose.Types.ObjectId
  parentId: mongoose.Types.ObjectId
  userCommenting : {
    userId: mongoose.Types.ObjectId
    userName: String
    userImage: String
  }  
  taggedUser: String
  text: String
  date: Date
  hearts: mongoose.Types.ObjectId[]
}

interface IReplys {
 replies: IReply[]
}

interface ICategory {
  _id?: mongoose.Types.ObjectId,
  category: string
}


interface ICategories {
  categories: ICategory[] 
 }