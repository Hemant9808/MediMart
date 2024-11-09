
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

// Base URL for cart-related API endpoints
 const CART_API_BASE_URL = "https://medimart-nayg.onrender.com/cart";
//const CART_API_BASE_URL = "http://localhost:4000/cart";

const token = 'fglmds'
console.log("token",token);

// const token = storedToken!=undefined ? JSON.parse(storedToken) : '';
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
//     const {userDetails} = useSelector((state)=>state.auth)
// const token = userDetails.token;
    const response = await axios.get(`${CART_API_BASE_URL}/getUserCart`, {
      headers: {
        authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTE1NzFmZWM4M2VlM2E4OGJjNzI4YSIsImlhdCI6MTcyNjQxMzc1OX0.QH1quEr3Hakn0Ku4h7GSLbAlyrr1tj3QkEeeH9OooC0",
         
      },
    });
    console.log("response.data.", response.data.items);

    return response.data;
    
  } catch (error) {
    console.log("addNewProduct error:- ", error);
    return error.message;
  }
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (credentials) => {
    console.log("credentials", credentials);
    console.log("CART_API_BASE_URL", CART_API_BASE_URL);

    try {
      const response = await axios.post(
        ` ${CART_API_BASE_URL}/addToCart`,
        credentials,
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTE1NzFmZWM4M2VlM2E4OGJjNzI4YSIsImlhdCI6MTcyNjQxMzc1OX0.QH1quEr3Hakn0Ku4h7GSLbAlyrr1tj3QkEeeH9OooC0",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("addNewProduct error:- ", error);
      return error.message;
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    try {
      const response = await axios.delete(`${CART_API_BASE_URL}/removeItemFromCart/${productId}`, {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTE1NzFmZWM4M2VlM2E4OGJjNzI4YSIsImlhdCI6MTcyNjQxMzc1OX0.QH1quEr3Hakn0Ku4h7GSLbAlyrr1tj3QkEeeH9OooC0",
          "Content-Type": "application/json",
        },      });
      return response.data; 
    } catch (error) {
      console.log("addNewProduct error:- ", error);
      return error.message;
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }) => {
    try {
      const response = await axios.put(
        `${CART_API_BASE_URL}/${productId}`,
        { quantity },
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTE1NzFmZWM4M2VlM2E4OGJjNzI4YSIsImlhdCI6MTcyNjQxMzc1OX0.QH1quEr3Hakn0Ku4h7GSLbAlyrr1tj3QkEeeH9OooC0",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.log("addNewProduct error:- ", error);
      return error.message;
    }
  }
);


const cartSlice = createSlice({
  name: "CartDetails",
  initialState: {
    cart: {
      items:[],
      totalPrice:0,
      totalItems:0,
      
    },
    

    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state, action) => {
        console.log("fetchCart.fulfilled", action);
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log("fetchCart.fulfilled", action);
        state.loading = false;
        state.cart = {
          items: action.payload.items,
          totalItems: action.payload.totalItems,
          totalPrice: action.payload  .totalPrice,
        };
      })
      .addCase(fetchCart.rejected, (state, action) => {
        console.log("fetchCart.rejected", action);

        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = {
          items: action.payload.items,
          totalItems: action.payload.totalItems,
          totalPrice: action.payload.totalPrice,
        };
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = {
          items: action.payload.items,
          totalItems: action.payload.totalItems,
          totalPrice: action.payload  .totalPrice,
        };
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; 
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
