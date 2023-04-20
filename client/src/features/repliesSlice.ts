import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { convertCompilerOptionsFromJson } from 'typescript'
import { baseURL } from '../utils/connectionURL'

const initialState = {
  replies: [],
  replyStatus: 'pending',
  replyError: '',
} as IReplys

interface RejectedAction extends Action {
  error: Error
}

function isRejectedAction(action: RejectedAction) {
  return action.type.endsWith('rejected')
}

function isPendingAction(action: Action) {
  return action.type.endsWith('pending')
}

interface HeartReplyProps {
  pinId: string
  commentId: string
  userId: string
  replyId: string
}

interface CreateReplyProps {
  pinId: String,
  commentId: any,
  replyId: any
  userCommenting: {
    userId: any
    userName: any, 
    userImage: any,
  }
  taggedUser: any,
  text: any, 
}
  export const getReplies = createAsyncThunk(
    'replies/getReplies',
    
    async (id:any = null, { rejectWithValue }) => {
      try {
        const response = await axios.get(baseURL + `replies/${id}`)
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

  export const getRepliesByComment = createAsyncThunk(
    'replies/getReplies',
    
    async ({id, commentId}:any = null, { rejectWithValue }) => {
      try {
        const response = await axios.get(baseURL + `replies/${id}/${commentId}`, )
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
    'replies/createReply',
    
    async ({pinId, commentId = null, replyId = null, text, taggedUser= null, userCommenting={ userId: null, userName: null, userImage: null}}: CreateReplyProps, { rejectWithValue }) => {
      try {
        const response = await axios.post(baseURL + `replies/createReply/${pinId}`, {text, commentId, replyId, userCommenting, taggedUser})
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

  export const heartRepliesPin = createAsyncThunk(
    'replies/heartRepliesPin',

    async ({pinId, commentId, userId, replyId}: HeartReplyProps, { rejectWithValue }) => {
      try {
        const response = await axios.post(baseURL + `replies/heartRepliesPin/${pinId}`, {commentId, userId, replyId})
        
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


const repliesSlice = createSlice({
  name: 'replies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReply.fulfilled, (state, action) => {
        return { ...state, replies: [action.payload, ...state.replies], replyStatus: 'success', replyError: '' }
      }) 
      .addCase(getReplies.fulfilled, (state, action) => {
        return { ...state, replies: action.payload, replyStatus: 'success', replyError: '' }
      })
      .addCase(heartRepliesPin.fulfilled, (state, action) => {
        return { ...state, replies: [action.payload, ...state.replies], replyStatus: 'success', replyError: '' }
      })        
      .addMatcher(
        isPendingAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {
          return { ...state, replyStatus: 'pending', replyError: action.payload }
      })
      .addDefaultCase((state, action) => {
        return { ...state, replyStatus: '', replyError: '' }
      })
  }
})

export default repliesSlice.reducer