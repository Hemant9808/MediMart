import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const LOGIN_API = 'login'
// const REGISTER_API = 'register'
// const LOGOUT_API = 'logout'

export const loginAccount = createAsyncThunk(
    'auth/loginAccount',
    async (credentials) => {
        console.log('loginAccount credentials:-', credentials);
        try {
            const formData = new FormData();

            formData.append("email", credentials.username);
            formData.append("password", credentials.password);

            const response = await axios.post(LOGIN_API,formData);
            console.log('response- login !=',response);
            
            return response;
        } catch (error) {
            console.log('loginAccount error:- ', error);
            return error.message
        }
    }
  );



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userDetails: "",
    loading: false,
    error: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAccount.pending, (state) => {
        console.log('loginAccount.pending',  state);
        state.loading = true;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        console.log('loginAccount.fulfilled',  action);
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(loginAccount.rejected, (state, action) => {
        console.log('loginAccount.rejected',  action);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;