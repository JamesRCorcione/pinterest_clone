import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { NextFunction } from 'express'


const baseURL = 'http://localhost:8080/api/'

const initialState = {
  categories: [],
  categoryStatus: 'pending',
  categoryError: '',
} as ICategories

interface RejectedAction extends Action {
  error: Error
}

function isRejectedAction(action: RejectedAction) {
  return action.type.endsWith('rejected')
}

function isPendingAction(action: Action) {
  return action.type.endsWith('pending')
}

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL + 'categories', { category })
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

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (page: any = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseURL + 'categories')
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

export const updateCategories = createAsyncThunk(
  'categories/updateCategories',
  async ({ _id, category }: ICategory, { rejectWithValue }) => {
    try {
      const response = await axios.put(baseURL + 'categories/' + _id, category)

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

export const deleteCategories = createAsyncThunk(
  'categories/deleteCategories',
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(baseURL + 'categories/' + id)
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


export const searchCategories = createAsyncThunk(
  'categories/searchCategories',
  async (searchTerm: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseURL + 'categories/search/'+ searchTerm)
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


const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.fulfilled, (state, action) => {
        return { ...state, categories: [action.payload, ...state.categories], categoryStatus: 'success', categoryError: '' }
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        return { ...state, categories: action.payload, categoryStatus: 'success', categoryError: '' }
      })
      .addCase(updateCategories.fulfilled, (state, action) => {
        const updatedPins = state.categories.map((category) =>
        category._id === action.payload._id ? action.payload : category
        )
        return { ...state, categories: updatedPins, categoryStatus: 'success', categoryError: '' }
      })
      .addCase(deleteCategories.fulfilled, (state, action) => {
        const currentPins = state.categories.filter(
          (category) => category._id !== action.payload._id
        )
        return { ...state, categories: currentPins, categoryStatus: 'success', categoryError: '' }
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        return { ...state, categories: action.payload, categoryStatus: 'success', categoryError: '' }
      })
      .addMatcher(
        isPendingAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {
          return { ...state, categoryStatus: 'pending', categoryError: action.payload }
      })
      .addDefaultCase((state, action) => {
        return { ...state, categoryStatus: '', categoryError: '' }
      })
  }
})

export default categoriesSlice.reducer