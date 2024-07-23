import {
    createSlice,
    createAsyncThunk,
    isRejectedWithValue,
  } from "@reduxjs/toolkit";
  
  const apiUrl = process.env.REACT_APP_API_URL;
  
  /////////add strtus
  export const addBrand = createAsyncThunk(
    "addBrand",
    async (data, { rejectWithValue }) => {
      const responce = await fetch(`${apiUrl}/addbrand/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
  export const UpdateBrand = createAsyncThunk(
    "UpdateBrand",
    async (data, { rejectWithValue }) => {
      const responce = await fetch(
        `${apiUrl}/updatebrand/${data?._id}`,
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
  export const getBrand = createAsyncThunk(
    "getBrand",
    async (dara, { rejectWithValue }) => {
      const resource = await fetch(
        `${apiUrl}/getAllbrand/`
      );
      const result = await resource.json();
      if (result.success === true) {
        return result;
      } else {
        return rejectWithValue(result.message);
      }
    }
  );

 

  
  /////// deleteProduct_service
  
  export const deleteBrand = createAsyncThunk(
    "deleteBrand",
    async (_id, { rejectWithValue }) => {
      const responce = await fetch(
        `${apiUrl}/deletebrand/${_id}`,
        {
          method: "DELETE",
        }
      );
  
      const result = await responce.json();
  
      if (result.success === true) {
        return await result;
      } else {
        return rejectWithValue(result.message);
      }
    }
  );
  
  export const productcategory = createSlice({
    name: "productservice",
    initialState: {
      ProductCategory: [],
      loading: false,
      error: null,
      message: "",
    },
    extraReducers: {
      // create add Product Service
      [addBrand.pending]: (state) => {
        state.loading = true;
      },
      [addBrand.fulfilled]: (state, action) => {
        state.loading = false;
        //console.log('dsfvds',action.payload.category)
        // state.ProductCategory.brand.push(action.payload.brand);
      },
      [addBrand.rejected]: (state, action) => {
        state.loading = false;
        state.ProductCategory = action.payload;
      },
      //////update Api 
      [UpdateBrand.pending]: (state) => {
        state.loading = true;
      },
      [UpdateBrand.fulfilled]: (state, action) => {
        state.loading = false;
        // state.ProductCategory.category=state.ProductCategory.category.map((ele)=>
        // ele._id===action.payload.category1._id?action.payload.category1:ele
       // );
      },
      [UpdateBrand.rejected]: (state, action) => {
        state.loading = false;
        state.ProductCategory = action.payload;
      },
  
  
      /// get all product and service
      [getBrand.pending]: (state) => {
        state.loading = true;
      },
      [getBrand.fulfilled]: (state, action) => {
        state.loading = false;
        state.ProductCategory = action.payload.brand;
      },
      [getBrand.rejected]: (state, action) => {
        state.loading = false;
        state.ProductCategory = action.payload;
      },
  
      //// deleteProduct_service
      [deleteBrand.pending]: (state) => {
        state.loading = true;
      },
      [deleteBrand.fulfilled]: (state, action) => {
        state.loading = false;
      //     const { _id } = action.payload?.brand;
      //  if (_id) {
      //     state.ProductCategory.category =
      //       state.ProductCategory.brand.filter((ele) => ele._id !== _id);
      //  }
      },

    },
  });
  
  export default productcategory.reducer;
  