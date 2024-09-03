import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const LOGIN_API = 'https://medimart-nayg.onrender.com/login'
const REGISTER_API = 'https://medimart-nayg.onrender.com/signup'
// const LOGOUT_API = 'logout'

export const loginAccount = createAsyncThunk(
    'auth/loginAccount',
    async (credentials) => {
        console.log('loginAccount credentials:-', credentials);
        try {
            const formData = new FormData();

            formData.append("email", credentials.email);
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
export const createAccount = createAsyncThunk(
    'auth/createAccount',
    async (credentials) => {
        // console.log('createAccount credentials:-', credentials);
        try {
            const formData = new FormData();

            formData.append("firstName", credentials.firstName);
            formData.append("lastName", credentials.lastName);
            formData.append("userName", credentials.userName);
            formData.append("phone", credentials.phone);
            formData.append("email", credentials.email);
            formData.append("password", credentials.password);
            formData.append("cmPassword", credentials.cmPassword);

            const response = await axios.post(REGISTER_API,formData);
            // console.log('response- login !=',response);
            
            return response;
        } catch (error) {
            console.log('createAccount error:- ', error);
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
    builder
      .addCase(createAccount.pending, (state) => {
        console.log('createAccount.pending',  state);
        state.loading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        console.log('createAccount.fulfilled',  action);
        state.loading = false;
        localStorage.setItem("token", action.payload.token)
        state.userDetails = action.payload;
      })
      .addCase(createAccount.rejected, (state, action) => {
        console.log('createAccount.rejected',  action);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;