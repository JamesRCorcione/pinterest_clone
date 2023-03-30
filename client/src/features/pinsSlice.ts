import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { NextFunction } from 'express'


const baseURL = 'http://localhost:8080/api/'

const initialState = {
  pins: [],
  pinStatus: 'pending',
  pinError: '',
} as IPins

interface RejectedAction extends Action {
  error: Error
}

function isRejectedAction(action: RejectedAction) {
  return action.type.endsWith('rejected')
}

function isPendingAction(action: Action) {
  return action.type.endsWith('pending')
}


const API = axios.create({ baseURL: 'http://localhost:8080/api/' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') || 'false').token}`
  }

  return req
})

export const createPin = createAsyncThunk(
  'pins/createPin',
  
  async (pin: IPin, { rejectWithValue }) => {
    try {
      const response = await API.post('pins', pin)
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

export const getPins = createAsyncThunk(
  'pins/getPins',
  async (page: any = null, { rejectWithValue }) => {
    try {
      const response = await API.get('pins')
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

export const getPinsByCategory = createAsyncThunk(
  'pins/category/getPinsByCategory',
  async (category: any = null, { rejectWithValue }) => {
    try {
      const response = await API.get(`pins/category/${category}`)
      console.log('response', response.data)
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

export const getPinsByCreator = createAsyncThunk(
  'pins/user-created-pins/getPinByCreator',
  async (id: any = null, { rejectWithValue }) => {
    try {
      console.log(`pins/user-created/` + id)
      const response = await API.get(`pins/user-created-pins/${id}`)
      console.log('response', response.data)
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


export const getPin = createAsyncThunk(
  'pins/getPin',
  async (id: any = null, { rejectWithValue }) => {
    try {
      const response = await API.get(`pins/${id}`)      
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

export const updatePin = createAsyncThunk(
  'pins/updatePin',
  async (pin: IPin, { rejectWithValue }) => {
    try {
      const { _id, title, text, image, destination, postedBy } = pin

      const response = await API.put('pins/' + _id, pin)

      return response.data.comments 
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

export const deletePin = createAsyncThunk(
  'pins/deletePin',
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await API.delete('pins/' + id)
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


export const searchPins = createAsyncThunk(
  'pins/searchPins',
  async (searchTerm: any, { rejectWithValue }) => {
    try {
      const response = await API.get('pins/search/'+ searchTerm)
      console.log('resp')
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


const pinSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPin.fulfilled, (state, action) => {
        return { ...state, pins: [action.payload, ...state.pins], pinStatus: 'success', pinError: '' }
      })
      .addCase(getPins.fulfilled, (state, action) => {
        return { ...state, pins: action.payload, pinStatus: 'success', pinError: '' }
      })
      .addCase(getPin.fulfilled, (state, action) => {
        return { ...state, pin: action.payload, pinStatus: 'success', pinError: '' }
      })
      .addCase(updatePin.fulfilled, (state, action) => {
        const updatedPins = state.pins.map((pin) =>
        pin._id === action.payload._id ? action.payload : pin
        )
        return { ...state, pins: updatedPins, pinStatus: 'success', pinError: '' }
      })
      .addCase(deletePin.fulfilled, (state, action) => {
        const currentPins = state.pins.filter(
          (pin) => pin._id !== action.payload._id
        )
        return { ...state, pins: currentPins, pinStatus: 'success', pinError: '' }
      })
      .addCase(getPinsByCreator.fulfilled, (state, action) => {
        return { ...state, pins: action.payload, pinStatus: 'success', pinError: '' }
      })
      .addCase(getPinsByCategory.fulfilled, (state, action) => {
        return { ...state, pins: action.payload, pinStatus: 'success', pinError: '' }
      })
      .addCase(searchPins.fulfilled, (state, action) => {
        return { ...state, pins: action.payload, pinStatus: 'success', pinError: '' }
      })
      .addMatcher(
        isPendingAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {
          return { ...state, pinStatus: 'pending', pinError: action.payload }
      })
      .addDefaultCase((state, action) => {
        return { ...state, pinStatus: '', pinError: '' }
      })
  }
})

export default pinSlice.reducer