import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { convertCompilerOptionsFromJson } from 'typescript'
import { baseURL } from '../utils/connectionURL'

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

const API = axios.create({ baseURL })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') || 'false').token}`
    req.headers.authorizationtype = `${JSON.parse(localStorage.getItem('profile') || 'false').authType}`
  }

  return req
})

interface CreateCommentProps {
    pinId: String,
    commenterId: any
    text: any,     
}

interface HeartCommentProps {
  pinId: string
  commentId: string
  userId: string
  replyId: string
}
interface DeleteReplyProps {
  pinId: string
  commentId: string
  replyId: string
}

interface UpdateReplyProps {
  pinId: string
  commentId: string
  replyId: string
  text: string
}

interface CreateReplyProps {
  pinId: String,
  commentId: any,
  replyId: any
  commentingUserId: any
  taggedUser: any,
  text: any, 
}

export const getComments = createAsyncThunk(
    'comments/getComments',
    
    async (id:any = null, { rejectWithValue }) => {
      try {
        const response = await API.get(baseURL + `comments/${id}`)
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
    
    async ({pinId, text, commenterId}: CreateCommentProps, { rejectWithValue }) => {
      try {
        const response = await API.post(baseURL + `comments/${pinId}`, {text, commenterId})
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

  export const heartCommentPin = createAsyncThunk(
    'comments/heartCommentPin',

    async ({pinId, commentId, userId, replyId}: HeartCommentProps, { rejectWithValue }) => {
      try {
        const response = await API.put(baseURL + `comments/heartCommentPin/${pinId}`, {commentId, userId, replyId})
        
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

  export const unheartCommentPin = createAsyncThunk(
    'comments/unheartCommentPin',

    async ({pinId, commentId, userId, replyId}: HeartCommentProps, { rejectWithValue }) => {
      try {
        const response = await API.put(baseURL + `comments/unheartCommentPin/${pinId}`, {commentId, userId, replyId})
        
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

  export const heartReplyPin = createAsyncThunk(
    'comments/heartReplyPin',

    async ({pinId, commentId, userId, replyId}: HeartCommentProps, { rejectWithValue }) => {
      try {
        const response = await API.put(baseURL + `comments/heartReplyPin/${pinId}`, {commentId, userId, replyId})
        
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

  export const unheartReplyPin = createAsyncThunk(
    'comments/unheartReplyPin',

    async ({pinId, commentId, userId, replyId}: HeartCommentProps, { rejectWithValue }) => {
      try {
        const response = await API.put(baseURL + `comments/unheartReplyPin/${pinId}`, {commentId, userId, replyId})
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
    
    async ({pinId, commentId = null, replyId = null, text, taggedUser, commentingUserId}: CreateReplyProps, { rejectWithValue }) => {
      try {
        const response = await API.post(baseURL + `comments/createReply/${pinId}`, {text, commentId, replyId, commentingUserId, taggedUser})
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

  export const deleteReply = createAsyncThunk(
    'comments/deleteReply',
    async ({pinId, commentId,  replyId}: DeleteReplyProps, { rejectWithValue }) => {
      try {
        const response = await API.delete(baseURL + `comments/${commentId}/deleteReply/${replyId}`)
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

  export const updateReply = createAsyncThunk(
    'comments/updateReply',
    async ({pinId, commentId,  replyId, text}: UpdateReplyProps, { rejectWithValue }) => {
      try {
  
        const response = await API.put(baseURL + `comments/${commentId}/updateReply/${replyId}`, {text})  
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

  export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async ({pinId, commentId,  replyId}: DeleteReplyProps, { rejectWithValue }) => {
      try {
        const response = await API.delete(baseURL + `comments/${commentId}`)
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

  export const updateComment = createAsyncThunk(
    'comments/updateComment',
    async ({pinId, commentId,  replyId, text}: UpdateReplyProps, { rejectWithValue }) => {
      try {
  
        const response = await API.put(baseURL + `comments/${commentId}`, {text})  
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
      .addCase(getComments.fulfilled, (state, action) => {
        return { ...state, comments: action.payload, commentStatus: 'success', commentError: '' }
      })   
      .addCase(updateReply.fulfilled, (state, action) => {
        const updatedComments = state.comments.map((reply) =>
        reply._id === action.payload._id ? action.payload : reply
        )
        return { ...state, comments: updatedComments, commentStatus: 'success', commentError: '' }
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const updatedComments = state.comments.map((reply) =>
        reply._id === action.payload._id ? action.payload : reply
        )
        return { ...state, comments: updatedComments, commentStatus: 'success', commentError: '' }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const currentComments = state.comments.filter(
          (comment) => comment._id !== action.payload._id
        )
        return { ...state, comments: currentComments, commentStatus: 'success', commentError: '' }
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