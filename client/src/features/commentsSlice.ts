import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { convertCompilerOptionsFromJson } from 'typescript'

const baseURL = 'http://localhost:8080/api/'

const initialState = {
  comments: [],
  commentStatus: 'pending',
  commentError: '',
} as IComments

interface RejectedAction extends Action {
  error: Error
}

function isRejectedAction(action: RejectedAction) {
  return action.type.endsWith('rejected')
}

function isPendingAction(action: Action) {
  return action.type.endsWith('pending')
}

interface CreateCommentProps {
    pinId: String,
    userName: any, 
    userImage: any,
    text: any,     
}

interface CreateReplyProps {
  pinId: String,
  commentId: any,
  userName: any, 
  userImage: any,
  text: any,     
}

export const getComments = createAsyncThunk(
    'comments/getComments',
    
    async (id:any = null, { rejectWithValue }) => {
      try {
        const response = await axios.get(baseURL + `comments/${id}`)
        console.log('response')
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

export const createComment = createAsyncThunk(
    'comments/createComment',
    
    async ({pinId, text, userName, userImage}: CreateCommentProps, { rejectWithValue }) => {
      try {
        const response = await axios.post(baseURL + `comments/${pinId}`, {text, userName, userImage})
        console.log('response')
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

  export const createReply = createAsyncThunk(
    'comments/createReply',
    
    async ({pinId, commentId, text, userName, userImage}: CreateReplyProps, { rejectWithValue }) => {
      try {
          console.log(pinId, commentId, text, userName, userImage)
        const response = await axios.post(baseURL + `comments/reply/${pinId}`, {text, commentId, userName, userImage})
        console.log('response')
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


const commentsSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        return { ...state, comments: [action.payload, ...state.comments], commentStatus: 'success', commentError: '' }
      })      
      .addCase(createReply.fulfilled, (state, action) => {
        return { ...state, comments: [action.payload, ...state.comments], commentStatus: 'success', commentError: '' }
      })   
      .addCase(getComments.fulfilled, (state, action) => {
        return { ...state, comments: action.payload, commentStatus: 'success', commentError: '' }
      })   
      .addMatcher(
        isPendingAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {
          return { ...state, commentStatus: 'pending', commentError: action.payload }
      })
      .addDefaultCase((state, action) => {
        return { ...state, commentStatus: '', commentError: '' }
      })
  }
})

export default commentsSlice.reducer