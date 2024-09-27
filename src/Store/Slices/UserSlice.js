import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
import axiosInstance from '../../Utils/AxiosConfig';
import { toast } from 'react-toastify';
const initialState = {
  loading: false,
  error: null,
  message: null,
  authentication: false,
  userProfileData: null
}

export const Authentication = createAsyncThunk(
  "user/checkAuthentication",
  async (_, { rejectWithValue }) => {
    // try {
    //   // Get the token from cookies
    //   const token = Cookies.get('token');
    //   console.log("@@@@@@@",token);
      
    //   if (token) {
    //     return true; // If token exists, return true
    //   } else {
    //     return false; // If no token, return false
    //   }
    // } catch (error) {
    //   return rejectWithValue('Error while checking authentication');
    // }
    return axiosInstance.get("/api/user/check-token", {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      return response.data.token
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        // toast.error('An unexpected error occurred');
        return rejectWithValue('An unexpected error occurred');
      }
    });
  }
);

export const GetUserProfile = createAsyncThunk(
  "GetUserProfile",
  (_, { rejectWithValue }) => {
    return axiosInstance.get("/api/user/getUserProfile", {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      return response.data.user
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

export const Logout = createAsyncThunk(
  "Logut",
  (_, { rejectWithValue }) => {
    return axiosInstance.get("/api/user/logout", {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
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

export const UpdateProfileAction = createAsyncThunk(
  "UpdateProfileAction",
  (payload, { rejectWithValue }) => {
    console.log(payload);
    
    return axiosInstance.put("/api/user/UpdateProfile",payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
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

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(Authentication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Authentication.fulfilled, (state, action) => {
        state.loading = false;
        state.authentication = action.payload;
      })
      .addCase(GetUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfileData = action.payload;
      })
      .addCase(GetUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // action.payload contains the error message
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfileData = null;
        state.authentication = false;
      })
      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // action.payload contains the error message
      })
      .addCase(UpdateProfileAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(UpdateProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // action.payload contains the error message
      });

  }
})


export default UserSlice.reducer