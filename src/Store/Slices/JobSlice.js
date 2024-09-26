import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../Utils/AxiosConfig';
import { toast } from 'react-toastify';
const initialState = {
  allJobs: [],
  loading: false,
  userProfileData: null
}

export const PostNewJob = createAsyncThunk(
  "PostNewJob",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    return axiosInstance.post("/api/jobs/post-job", payload, {
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

export const GetAllJobs = createAsyncThunk(
  "AllJobs",
  async (_, { rejectWithValue }) => {
    return axiosInstance.get("/api/jobs/all-jobs", {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      return response.data.jobs
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        // toast.error('An unexpected error occurred');
        return rejectWithValue('An unexpected error occurred');
      }
    });
  });

export const selectUserProfileData = (state) => state.user.userProfileData;


export const IsSavedJob = createAsyncThunk(
  "IsSavedJob",
  (payload, { getState, rejectWithValue }) => {
    const state = getState(); // Get the current state
    const userProfileData = state.user.userProfileData; // Access userProfileData

    // Check if savedJobs includes the job ID
    if (userProfileData?.savedJobs.includes(payload)) {
      console.log(userProfileData);
      
      return { isSaved: true }; // Return a value if the job is saved
    } else {
      return { isSaved: false }; // Return a value if the job is not saved
    }
    // return axiosInstance.get(`/api/jobs/is-saved-job/${payload}`, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   }
    // }).then((response) => {
    //   return response.data.user
    // }).catch((error) => {
    //   if (error.response && error.response.data && error.response.data.message) {
    //     toast.error(error.response.data.message);
    //     return rejectWithValue(error.response.data.message);
    //   } else {
    //     toast.error('An unexpected error occurred');
    //     return rejectWithValue('An unexpected error occurred');
    //   }
    // });
  });

export const SaveJob = createAsyncThunk(
  "SaveJob",
  (payload, { rejectWithValue }) => {
    return axiosInstance.post(`/api/jobs/save-job/${payload}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      toast.success(response.data.message)
      return response.data.user
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

export const UnSaveJob = createAsyncThunk(
  "UnSaveJob",
  (payload, { rejectWithValue }) => {
    return axiosInstance.post(`/api/jobs/un-save-job/${payload}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      toast.success(response.data.message)
      return response.data.user
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

export const JobSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(PostNewJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PostNewJob.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(GetAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.allJobs = action.payload;
        state.allJobs = action.payload;
      })
      .addCase(IsSavedJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(IsSavedJob.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(SaveJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SaveJob.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(UnSaveJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UnSaveJob.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase('user/setUserProfileData', (state, action) => {
        // Access the userProfileData from the UserSlice
        const userProfileData = action.payload; // or you could access it through a selector
        console.log('User Profile Data:', userProfileData);
      });
  }
})


export default JobSlice.reducer