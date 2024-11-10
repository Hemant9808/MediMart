import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { formToJSON } from "axios";

const LOGIN_API = 'https://medimart-nayg.onrender.com/auth/login'
// const LOGIN_API = 'http://localhost:4000/auth/login'

const REGISTER_API = 'https://medimart-nayg.onrender.com/auth/signup'
// const REGISTER_API = 'http://localhost:4000/auth/signup'

export const loginAccount = createAsyncThunk(
  "auth/loginAccount",
  async (credentials) => {
    console.log("loginAccount credentials:-", credentials);
    try {
      const formData = new FormData();

      formData.append("email", credentials.email);
      formData.append("password", credentials.password);

      const response = await axios.post(LOGIN_API, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
       if(response.status==200){
      localStorage.setItem('savedUser', JSON.stringify(response.data));
      localStorage.setItem('JWTtoken', JSON.stringify(response.data.token));}


      console.log("response- login !=", response);

      return response;
    } catch (error) {
      console.log("loginAccount error:- ", error);
      return error.message;
    }
  }
);
export const createAccount = createAsyncThunk(
  "auth/createAccount",
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
      // formData.append("cmPassword", credentials.cmPassword);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post(REGISTER_API, formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      //const response = await axios.post(REGISTER_API, formData);
      console.log('done',response.data);
      if(response.status==200){
      localStorage.setItem('savedUser', JSON.stringify(response.data?.saveUser || ''));
      localStorage.setItem('JWTtoken', JSON.stringify(response.data?.token || '' ));
      }
       console.log('token set');

      return response;
    } catch (error) {
    
      console.log("createAccount error:- ", error);
      return error.message;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userDetails: JSON.parse(localStorage.getItem("savedUser")) || "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAccount.pending, (state) => {
        console.log("loginAccount.pending", state);
        state.loading = true;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        console.log("loginAccount.fulfilled", action);
        state.loading = false;
        localStorage.setItem("token" , action.payload.token);
        localStorage.setItem("saveUser", action.payload.saveUser);
        state.userDetails = action.payload.saveUser;
      })
      .addCase(loginAccount.rejected, (state, action) => {
        console.log("loginAccount.rejected", action);
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(createAccount.pending, (state) => {
        console.log("createAccount.pending", state);
        state.loading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        console.log("createAccount.fulfilled", action);
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userDetails", action.payload.saveUser);
        state.userDetails = action.payload.saveUser;
      })
      .addCase(createAccount.rejected, (state, action) => {
        console.log("createAccount.rejected", action);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
