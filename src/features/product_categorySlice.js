import {
    createSlice,
    createAsyncThunk,
    isRejectedWithValue,
  } from "@reduxjs/toolkit";
  
  const apiUrl = process.env.REACT_APP_API_URL;
  
  /////////add strtus
  export const addProductCategory = createAsyncThunk(
    "addProductCategory",
    async (data, { rejectWithValue }) => {
      const responce = await fetch(`${apiUrl}/addCategory/`, {
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

  //////////add subcategory
  export const addSubcategory = createAsyncThunk(
    "addSubcategory",
    async (data, { rejectWithValue }) => {
      const responce = await fetch(`${apiUrl}/addsubcategory/`, {
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
  export const UpdateProductCategory = createAsyncThunk(
    "UpdateProductCategory",
    async (data, { rejectWithValue }) => {
      const responce = await fetch(
        `${apiUrl}/updateCategory/${data?._id}`,
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

   //////// update subcategory
   export const UpdateSubCategory = createAsyncThunk(
    "UpdateSubCategory",
    async (data, { rejectWithValue }) => {
      const responce = await fetch(
        `${apiUrl}/updatesubCategory/${data?._id}`,
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
  export const getAllProductCategory = createAsyncThunk(
    "getAllProductCategory",
    async (dara, { rejectWithValue }) => {
      const resource = await fetch(
        `${apiUrl}/getAllcategory/`
      );
      const result = await resource.json();
      if (result.success === true) {
        return result;
      } else {
        return rejectWithValue(result.message);
      }
    }
  );

  //////// get getAllSubcategory
  export const getAllSubcategory = createAsyncThunk(
    "getAllSubcategory",
    async (dara, { rejectWithValue }) => {
      const resource = await fetch(
        `${apiUrl}/getsubcategory/`
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
  
  export const deleteProductCategory = createAsyncThunk(
    "deleteProductCategory",
    async (_id, { rejectWithValue }) => {
      const responce = await fetch(
        `${apiUrl}/deletecategory/${_id}`,
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

  export const deletesubCategory = createAsyncThunk(
    "deletesubCategory",
    async (_id, { rejectWithValue }) => {
      const responce = await fetch(
        `${apiUrl}/deletesubcategory/${_id}`,
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
      Subcategory:[],
      loading: false,
      error: null,
      message: "",
    },
    extraReducers: {
      // create add Product Service
      [addProductCategory.pending]: (state) => {
        state.loading = true;
      },
      [addProductCategory.fulfilled]: (state, action) => {
        state.loading = false;
        //console.log('dsfvds',action.payload.category)
        state.ProductCategory.category.push(action.payload.category);
      },
      [addProductCategory.rejected]: (state, action) => {
        state.loading = false;
        state.ProductCategory = action.payload;
      },
      //////update Api 
      [UpdateProductCategory.pending]: (state) => {
        state.loading = true;
      },
      [UpdateProductCategory.fulfilled]: (state, action) => {
        state.loading = false;
        console.log('action',action.payload); 
        state.ProductCategory.category=state.ProductCategory.category.map((ele)=>
        ele._id===action.payload.category1._id?action.payload.category1:ele
     );
      },
      [UpdateProductCategory.rejected]: (state, action) => {
        state.loading = false;
        state.ProductCategory = action.payload;
      },
  
  
      /// get all product and service
      [getAllProductCategory.pending]: (state) => {
        state.loading = true;
      },
      [getAllProductCategory.fulfilled]: (state, action) => {
        state.loading = false;
        state.ProductCategory = action.payload;
      },
      [getAllProductCategory.rejected]: (state, action) => {
        state.loading = false;
        state.ProductCategory = action.payload;
      },
  
      //// deleteProduct_service
      [deleteProductCategory.pending]: (state) => {
        state.loading = true;
      },
      [deleteProductCategory.fulfilled]: (state, action) => {
        state.loading = false;
          const { _id } = action.payload?.category;
       if (_id) {
          state.ProductCategory.category =
            state.ProductCategory.category.filter((ele) => ele._id !== _id);
       }
      },

      

    /////////////manage subcategory here 

     // create add Product Service
     [addSubcategory.pending]: (state) => {
      state.loading = true;
    },
    [addSubcategory.fulfilled]: (state, action) => {
      state.loading = false;
      //console.log('dsfvds',action.payload.category)
      // state.Subcategory.subcategory.push(action.payload.subcategory);
    },
    [addSubcategory.rejected]: (state, action) => {
      state.loading = false;
      state.subcategory = action.payload;
    },

    ////get all subcategory 
    [getAllSubcategory.pending]: (state) => {
      state.loading = true;
    },
    [getAllSubcategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.Subcategory = action.payload;
    },
    [getAllSubcategory.rejected]: (state, action) => {
      state.loading = false;
      state.Subcategory = action.payload;
    },

     //// delete Subcategory
     [deletesubCategory.pending]: (state) => {
      state.loading = true;
    },
    [deletesubCategory.fulfilled]: (state, action) => {
      state.loading = false;
    //     const { _id } = action.payload?.category;
    //  if (_id) {
    //     state.Subcategory.category =
    //       state.Subcategory.category.filter((ele) => ele._id !== _id);
    //  }
    },

    //////update subcategory  Api 
    [UpdateSubCategory.pending]: (state) => {
      state.loading = true;
    },
    [UpdateSubCategory.fulfilled]: (state, action) => {
      state.loading = false;
  //     console.log('action',action.payload); 
  //     state.ProductCategory.category=state.ProductCategory.category.map((ele)=>
  //     ele._id===action.payload.category1._id?action.payload.category1:ele
  //  );
    },
    [UpdateSubCategory.rejected]: (state, action) => {
      state.loading = false;
      state.ProductCategory = action.payload;
    },


    },
  });
  
  export default productcategory.reducer;
  