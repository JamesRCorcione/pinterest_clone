import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

const baseURL = 'http://localhost:8080/api/'

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

  
// this is an action creator
export const SignUp = createAsyncThunk(
  'users',
  async (user: IUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL + 'users/signup', user)
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
  'users',
  async (user: IUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL + 'users/signin', user)
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

export const Logout = createAsyncThunk(
  'users',
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
        .addMatcher(
          isRejectedAction,
          // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
          (state, action) => {
            return { ...state, userStatus: 'rejected', userError: action.payload }
        })
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