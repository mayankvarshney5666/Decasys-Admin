import {
    createSlice,
    createAsyncThunk,
    isRejectedWithValue,
  } from "@reduxjs/toolkit";
  
  const apiUrl = process.env.REACT_APP_API_URL;
  
  /////////add strtus
  export const addProduct = createAsyncThunk(
    "addProduct",
    async (data, { rejectWithValue }) => {
      const responce = await fetch(`${apiUrl}/addproduct/`, {
        method: "POST",
         body: data,
      });
      const result = await responce.json();
  
      if (result.success === true) {
        return result;
      } else {
        return rejectWithValue(result.message);
      }
    }
  );
  //////// update
  export const UpdateProductService = createAsyncThunk(
    "UpdateProductService",
    async (data, { rejectWithValue }) => {
      const responce = await fetch(
        `${apiUrl}/update_product_service/${data?._id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await responce.json();
   
      if (result.success === true) {
        return result;
      } else {
        return rejectWithValue(result.message);
      }
    }
  );
  
  ////////get app status
  export const getAllProductService = createAsyncThunk(
    "getAllProductService",
    async (dara, { rejectWithValue }) => {
      const resource = await fetch(
        `${apiUrl}/all_product_service/`
      );
      const result = await resource.json();
      // console.log(result.success)
      if (result.success === true) {
        return result;
      } else {
        return rejectWithValue(result.message);
      }
    }
  );
  
  /////// deleteProduct_service
  
  export const deleteProductService = createAsyncThunk(
    "deleteProductService",
    async (_id, { rejectWithValue }) => {
      const responce = await fetch(
        `${apiUrl}/delete_product_service/${_id}`,
        {
          method: "DELETE",
        }
      );
  
      const result = await responce.json();
  
      if (result.success === true) {
        return result;
      } else {
        return rejectWithValue(result.message);
      }
    }
  );
  
  export const Product = createSlice({
    name: "productservice",
    initialState: {
      Product: [],
      loading: false,
      error: null,
      message: "",
    },
    extraReducers: {
      // create add Product Service
      [addProduct.pending]: (state) => {
        state.loading = true;
      },
      [addProduct.fulfilled]: (state, action) => {
        state.loading = false;
        state.Product.push(action.payload?.product);
      },
      [addProduct.rejected]: (state, action) => {
        state.loading = false;
        state.Product = action.payload;
      },
      //////update Api 
    //   [UpdateProductService.pending]: (state) => {
    //     state.loading = true;
    //   },
    //   [UpdateProductService.fulfilled]: (state, action) => {
    //     state.loading = false;
    //     console.log('action.payload',action.payload); 
    //     state.ProductService.product_service=state.ProductService.product_service.map((ele)=>
    //     ele._id===action.payload.product_service._id?action.payload.product_service:ele
    //  );
    //   },
    //   [UpdateProductService.rejected]: (state, action) => {
    //     state.loading = false;
    //     state.ProductService = action.payload;
    //   },
  
  
      /// get all product and service
      // [getAllProductService.pending]: (state) => {
      //   state.loading = true;
      // },
      // [getAllProductService.fulfilled]: (state, action) => {
      //   state.loading = false;
      //   state.ProductService = action.payload;
      // },
      // [getAllProductService.rejected]: (state, action) => {
      //   state.loading = false;
      //   state.ProductService = action.payload;
      // },
  
      //// deleteProduct_service
      // [deleteProductService.pending]: (state) => {
      //   state.loading = true;
      // },
      // [deleteProductService.fulfilled]: (state, action) => {
      //   state.loading = false;
      //   const { _id } = action.payload.product_service;
      //   if (_id) {
      //     state.ProductService.product_service =
      //       state.ProductService.product_service.filter((ele) => ele._id !== _id);
      //   }
      // },
    },
  });
  
  export default Product.reducer;
  