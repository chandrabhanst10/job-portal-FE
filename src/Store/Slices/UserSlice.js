import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../Utils/AxiosConfig';
import { toast } from 'react-toastify';
import HomeIcon from '@mui/icons-material/Home';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import BusinessIcon from '@mui/icons-material/Business';
const initialState = {
  loading: false,
  error: null,
  message: null,
  authentication: false,
  userProfileData: null,
  showSubscriptionHeader:true,
  subscriptionPlans:[
    {
      icon:`${HomeIcon}`,
      type: "Basic Plan",
      price: "$100/month",
      desc: "Ideal for individuals just getting started.",
      features: [
        { text: "Access to all basic features" },
        { text: "Email support" },
        { text: "Single user account" }
      ]
    },
    {
      icon:`${HeartBrokenIcon}`,
      type: "Pro Plan",
      price: "$500/month",
      desc: "Perfect for professionals looking for more advanced tools.",
      features: [
        { text: "All features from Basic Plan" },
        { text: "Priority email support" },
        { text: "Multi-user collaboration" },
        { text: "Advanced analytics and reports" }
      ]
    },
    {
      icon:`${BusinessIcon}`,
      type: "Enterprise Plan",
      price: "$1000/month",
      desc: "Tailored solutions for large teams and businesses.",
      features: [
        { text: "All features from Pro Plan" },
        { text: "Dedicated account manager" },
        { text: "24/7 priority support" },
        { text: "Custom integrations and API access" }
      ]
    }
  ]
}

export const RegisterUser = createAsyncThunk(
  "RegisterUser",
  (payload, { rejectWithValue }) => {
    return axiosInstance.post("/api/user/register",payload).then((response) => {
      toast.success(response.data.message);
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

export const LoginUser = createAsyncThunk(
  "LoginUser",
  (payload, { rejectWithValue }) => {
    return axiosInstance.post("/api/user/login",payload).then((response) => {
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

export const Authentication = createAsyncThunk(
  "user/checkAuthentication",
  async (_, { rejectWithValue }) => {
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
  () => {
    return axiosInstance.get("/api/user/logout", {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  });

export const UpdateProfileAction = createAsyncThunk(
  "UpdateProfileAction",
  (payload, { rejectWithValue }) => {
    
    return axiosInstance.put("/api/user/UpdateProfile",payload).then((response) => {
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
    handleSubscriptionHeader: (state) => {
      state.showSubscriptionHeader = !state.showSubscriptionHeader
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        Authentication()
      })
      .addCase(LoginUser.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        Authentication()
        state.userProfileData= action.payload
      })
      .addCase(Authentication.pending, (state) => {
        state.error = null;
      })
      .addCase(Authentication.fulfilled, (state, action) => {
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

export const { handleSubscriptionHeader} = UserSlice.actions

export default UserSlice.reducer