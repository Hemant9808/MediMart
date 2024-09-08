import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GET_ALL_PRODUCTS = 'https://medimart-nayg.onrender.com/product/getAllProducts'
// const POST_PRODUCT_BY_ID = 'https://medimart-nayg.onrender.com/product/getProductById/'
const GET_PRODUCT_BY_CATEGORY = 'https://medimart-nayg.onrender.com/product/getProductByCategories?'
// const LOGOUT_API = 'logout'

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_) => {
    try {

      const response = await axios.post(GET_ALL_PRODUCTS, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response- getAllProducts !=", response);

      return response;
    } catch (error) {
      console.log("getAllProducts error:- ", error);
      return error.message;
    }
  }
);
export const categoryProducts = createAsyncThunk(
  "products/categoryProducts",
  async (credentials) => {
    console.log('categoryProducts credentials:-', credentials);
    try {
        // const formData = new FormData();

        // formData.append("categories", credentials);

        // /api/products?category=${categoryName}`

      const response = await axios.get(GET_PRODUCT_BY_CATEGORY + 'categories=' + credentials,
      )
      console.log('response- categoryProducts !=',response);

      return response;
    } catch (error) {
      console.log("categoryProducts error:- ", error);
      return error.message;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProductDetails: "",
    categoryWiseProducts: [],
    productByIdDetails: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        console.log("getAllProducts.pending", state);
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log("getAllProducts.fulfilled", action);
        state.loading = false;
        state.userDetails = action.payload.saveUser;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        console.log("getAllProducts.rejected", action);
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(categoryProducts.pending, (state) => {
        console.log("categoryProducts.pending", state);
        state.loading = true;
      })
      .addCase(categoryProducts.fulfilled, (state, action) => {
        console.log("categoryProducts.fulfilled", action);
        state.loading = false;
        state.categoryWiseProducts = action.payload.data;
      })
      .addCase(categoryProducts.rejected, (state, action) => {
        console.log("categoryProducts.rejected", action);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;