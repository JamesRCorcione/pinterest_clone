import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { baseURL } from '../utils/connectionURL'

const initialState = {
  users: [],
  userStatus: 'pending',
  userError: '',
} as IUsers

interface RejectedAction extends Action {
  error: Error
}

function isRejectedAction(action: RejectedAction) {
  return action.type.endsWith('rejected')
}

function isPendingAction(action: Action) {
  return action.type.endsWith('pending')
}

const API = axios.create({ baseURL })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') || 'false').token}`
    req.headers.authorizationtype = `${JSON.parse(localStorage.getItem('profile') || 'false').authType}`
  }

  return req
})  


// this is an action creator
export const SignUp = createAsyncThunk(
  'users/signup',
  async (user: IUser, { rejectWithValue }) => {
    try {
      const response = await API.post(baseURL + 'users/signup', user)
      localStorage.setItem('profile', JSON.stringify({ ...response.data }))
      return response.data
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err // cast the error for access
      if (!error.response) {
        throw err
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data)
    }
  }
)

export const SignIn = createAsyncThunk(
  'users/signin',
  async (user: IUser, { rejectWithValue }) => {
    try {
      const response = await API.post(baseURL + 'users/signin', user)
      localStorage.setItem('profile', JSON.stringify({ ...response.data }))
      return response.data
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err // cast the error for access
      if (!error.response) {
        throw err
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data)
    }
  }
)

export const GoogleSignUp = createAsyncThunk(
  'users/googleSignup',
  async (user: any, { rejectWithValue }) => {
    try {      
      const response = await API.post(baseURL + 'users/googleSignup', user)
      localStorage.setItem('profile', JSON.stringify({ ...response.data }))
      return response.data
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err // cast the error for access
      if (!error.response) {
        throw err
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data)
    }
  }
)

export const GoogleSignIn = createAsyncThunk(
  'users/googleSignin',
  async (user:any, { rejectWithValue }) => {
    try {
      const response = await API.post(baseURL + 'users/googleSignin', user)
      localStorage.setItem('profile', JSON.stringify({ ...response.data }))
      return response.data
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err // cast the error for access
      if (!error.response) {
        throw err
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data)
    }
  }
)

export const FacebookSignUp = createAsyncThunk(
  'users/facebookSignup',
  async (user: any, { rejectWithValue }) => {
    try {      
      const response = await API.post(baseURL + 'users/facebookSignup', user)
      localStorage.setItem('profile', JSON.stringify({ ...response.data }))
      return response.data
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err // cast the error for access
      if (!error.response) {
        throw err
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data)
    }
  }
)

export const FacebookSignIn = createAsyncThunk(
  'users/facebookSignin',
  async (user:any, { rejectWithValue }) => {
    try {
      const response = await API.post(baseURL + 'users/facebookSignin', user)
      localStorage.setItem('profile', JSON.stringify({ ...response.data }))
      return response.data
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err // cast the error for access
      if (!error.response) {
        throw err
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data)
    }
  }
)

export const GetUserById = createAsyncThunk (
    'users/getUserById',
    async (id: any = null, { rejectWithValue }) => {
      try {
        const response = await API.get(baseURL + `users/${id}`)
        return response.data
      } catch (err: any) {
        let error: AxiosError<ValidationErrors> = err // cast the error for access
          throw error 
      }
    }
)

export const getUsers = createAsyncThunk(
  'users/getUsers',
  
  async (id:any = null, { rejectWithValue }) => {
    try {
      const response = await API.get(baseURL + `users`)
      return response.data
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err // cast the error for access
      if (!error.response) {
        throw err
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data)
    }
  }
)

export const UpdateUser = createAsyncThunk (
  'users/updateUser',
  async ({_id, userName, password, image}: any = null, { rejectWithValue }) => {
    try {
      const response = await API.put(baseURL + `users/${_id}`, {userName, password, image})
      localStorage.setItem('profile', JSON.stringify({ ...response.data }))
      return response.data
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err // cast the error for access
        throw error 
    }
  }
)

export const DeleteUser = createAsyncThunk(
  'users/deleteUser',
  async ({userId}: any, { rejectWithValue }) => {
    try {
      const response = await API.delete('users/' + userId)
      return response.data
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err // cast the error for access
      if (!error.response) {
        throw err
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data)
    }
  }
)

export const SavePin = createAsyncThunk (
  'users/savePin',
  async ({user, pin}:SavePinProps, { rejectWithValue }) => {
    try {
      const response = await API.put(baseURL + `users/savePin/${user.result._id}`, {user, pin})
      localStorage.setItem('profile', JSON.stringify({ ...response.data }))
      return response.data
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err // cast the error for access
        throw error 
    }
  }
)

export const RemoveSavePin = createAsyncThunk (
  'users/removeSaves',
  async ({user, pin}:any, { rejectWithValue }) => {
    try {
      const response = await API.put(baseURL + `users/removeSavePin/${user.result._id}`, {user, pin})
      localStorage.setItem('profile', JSON.stringify({ ...response.data }))
      return response.data
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err // cast the error for access
        throw error 
    }
  }
)

export const Logout = createAsyncThunk(
  'users/logout',
  async () => {
    try {
      localStorage.clear()
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err // cast the error for access
        throw error 
    }
  }
)

  const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(SignUp.fulfilled, (state, action) => {
          return { ...state, users: [action.payload, ...state.users], userStatus: 'success', userError: '' }
        })   
        .addCase(SignIn.fulfilled, (state, action) => {
          return { ...state, users: [action.payload, ...state.users], userStatus: 'success', userError: '' }
        })   
        .addCase(GoogleSignUp.fulfilled, (state, action) => {
          return { ...state, users: [action.payload, ...state.users], userStatus: 'success', userError: '' }
        })   
        .addCase(GoogleSignIn.fulfilled, (state, action) => {
          return { ...state, users: [action.payload, ...state.users], userStatus: 'success', userError: '' }
        })  
        .addCase(FacebookSignIn.fulfilled, (state, action) => {
          return { ...state, users: [action.payload, ...state.users], userStatus: 'success', userError: '' }
        }) 
        .addCase(getUsers.fulfilled, (state, action) => {
          return { ...state, users: action.payload, userStatus: 'success', userError: '' }
        })  
        .addCase(GetUserById.fulfilled, (state, action) => {
          return { ...state, user: action.payload, userStatus: 'success', userError: '' }
        })
        .addCase(UpdateUser.fulfilled, (state, action) => {
          return { ...state, user: action.payload, userStatus: 'success', userError: '' }
        })
        .addCase(DeleteUser.fulfilled, (state, action) => {
          const currentUsers = state.users.filter(
            (user) => user._id !== action.payload._id
          )
          return { ...state, users: currentUsers, userStatus: 'success', userError: '' }
        })
        .addCase(SavePin.fulfilled, (state, action) => {
          const updatedUser = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
          )
          return { ...state, user: updatedUser, userStatus: 'success', userError: '' }
          }) 
        .addCase(RemoveSavePin.fulfilled, (state, action) => {
          const updatedUser = state.users.filter((user) =>
          user._id === action.payload._id ? action.payload : user
          )
          return { ...state, user: updatedUser, userStatus: 'success', userError: '' }
          }) 
//        .addMatcher(
//          isRejectedAction,
//          // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
//          (state, action) => {
//            return { ...state, userStatus: 'rejected', userError: action.payload }
//        })
        .addMatcher(
          isPendingAction,
          // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
          (state, action) => {
            return { ...state, userStatus: 'pending', userError: action.payload }
        })
        .addDefaultCase((state, action) => {
          return { ...state, userStatus: '', userError: '' }
        })
    }
  })
  
  export default usersSlice.reducer