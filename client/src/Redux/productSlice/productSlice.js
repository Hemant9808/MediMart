import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const GET_ALL_PRODUCTS =
  "https://medimart-nayg.onrender.com/product/getAllProducts/";
  // "http://localhost:4000/product/getAllProducts/";
const POST_ALL_PRODUCTS =
  "https://medimart-nayg.onrender.com/product/addProducts";
//"http://localhost:4000/product/addProducts"
// const POST_PRODUCT_BY_ID = 'https://medimart-nayg.onrender.com/product/getProductById/'
const GET_PRODUCT_BY_CATEGORY =
  "https://medimart-nayg.onrender.com/product/getProductByCategories?";
  // "http://localhost:4000/product/getProductByCategories?";

  // const LOGOUT_API = 'logout'
  // const token = JSON.parse(localStorage.getItem(token));

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
    console.log("categoryProducts credentials:-", credentials);
    try {
      // const formData = new FormData();

      // formData.append("categories", credentials);

      // /api/products?category=${categoryName}`

      const response = await axios.get(
        GET_PRODUCT_BY_CATEGORY + "category=" + credentials
      );
      console.log("response- categoryProducts !=", response);

      return response;
    } catch (error) {
      console.log("categoryProducts error:- ", error);
      return error.message;
    }
  }
);
export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (credentials) => {
    console.log("addNewProduct credentials:-", credentials);
    try {
      const formData = new FormData();

      formData.append("categories", credentials.categories);
      formData.append("stock", credentials.stock);
      formData.append("price", credentials.price);
      formData.append("name", credentials.name);
      formData.append("description", credentials.description);
      formData.append("manufacturer", credentials.manufacture);
      formData.append(
        "images",
        "[https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw1I5PVnPTR0fzvtuABoYgxZ&ust=1726506583866000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwi-squuuMWIAxVFe2wGHYPlOxoQjRx6BAgAEBg]"
      );
       formData.append("brand", credentials.brand);

      // /api/products?category=${categoryName}`
      let image = [
        {
          url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw1I5PVnPTR0fzvtuABoYgxZ&ust=1726506583866000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwi-squuuMWIAxVFe2wGHYPlOxoQjRx6BAgAEBg",
          alt: "parace",
        },
      ];
      const dataForm = {
        name: credentials.name,
        stock: credentials.stock,
        price: credentials.price,
        description: credentials.description,
        manufacturer: credentials.manufacture,
        categories: credentials.categories,
        images: image,
        brand: credentials.brand,
      };
      console.log("dataform",dataForm);
      
      const response = await axios.post(POST_ALL_PRODUCTS, dataForm, {
        headers: {
          authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTE1NzFmZWM4M2VlM2E4OGJjNzI4YSIsImlhdCI6MTcyNjQxMzc1OX0.QH1quEr3Hakn0Ku4h7GSLbAlyrr1tj3QkEeeH9OooC0",
        },
      });
      console.log("response- addNewProduct !=", response);

      return response;
    } catch (error) {
      console.log("addNewProduct error:- ", error);
      return error.message;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    newProduct: "",
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
    builder
      .addCase(addNewProduct.pending, (state) => {
        console.log("addNewProduct.pending", state);
        state.loading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        console.log("addNewProduct.fulfilled", action);
        state.loading = false;
        state.newProduct = action.payload.data;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        console.log("addNewProduct.rejected", action);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
