import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../Utils/AxiosConfig';
import { toast } from 'react-toastify';
const initialState = {
  allApplication: [],
  myApplication: false,
  userProfileData: null
}

export const PostNewApplication = createAsyncThunk(
  "PostNewJob",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    return axiosInstance.post(`/api/application/post-application/${payload.jobId}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      console.log(response);
      return response.data.message
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
        return rejectWithValue('An unexpected error occurred');
      }

    });
  });

export const ApplicationSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(PostNewApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PostNewApplication.fulfilled, (state, action) => {
        state.loading = false;
      })
      
  }
})


export default ApplicationSlice.reducer