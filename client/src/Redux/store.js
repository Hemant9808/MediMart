// import { applyMiddleware, compose, createStore } from "redux";
// import thunk from 'redux-thunk';
// import { rootReducer } from "./reducers";

// export const store = createStore(rootReducer,compose(applyMiddleware(thunk)))



import { configureStore } from '@reduxjs/toolkit';
import AuthSlice  from './authSlice/authSlice';
import productSlice from './productSlice/productSlice';

const store = configureStore({
  reducer: { 
    auth: AuthSlice,
    product: productSlice 
  },
});

export default store;