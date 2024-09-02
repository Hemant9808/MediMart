// import { applyMiddleware, compose, createStore } from "redux";
// import thunk from 'redux-thunk';
// import { rootReducer } from "./reducers";

// export const store = createStore(rootReducer,compose(applyMiddleware(thunk)))



import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './authSlice/authSlice';

const store = configureStore({
  reducer: { auth: AuthSlice },
});

export default store;