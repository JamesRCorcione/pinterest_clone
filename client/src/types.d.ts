// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

declare module 'react-file-base64'


//Users
interface IUser {
    _id?: mongoose.Types.ObjectId
    userName: string
    email: email
    password: string
    birthday: Date | null
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