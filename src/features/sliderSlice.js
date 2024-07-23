import {
    createSlice,
    createAsyncThunk,
    isRejectedWithValue,
  } from "@reduxjs/toolkit";
  
  const apiUrl = process.env.REACT_APP_API_URL;
  
  /////////add strtus
  export const addSlider = createAsyncThunk(
    "addSlider",
    async (formData, { rejectWithValue }) => {
     const responce = await fetch(
        `${apiUrl}/addslider`,
        {
          method: "POST",
          body: formData,
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
  export const getAllSlider = createAsyncThunk(
    "getAllSlider",
    async (dara, { rejectWithValue }) => {
      const resource = await fetch(
        `${apiUrl}/getAllSliderss/`
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
  
  export const deleteSlider = createAsyncThunk(
    "deleteSlider",
    async (_id, { rejectWithValue }) => {
      const responce = await fetch(
        `${apiUrl}/deleteslider/${_id}`,
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
  
  export const Slider = createSlice({
    name: "productservice",
    initialState: {
       Slider:[],
      loading: false,
      error: null,
      message: "",
    },
    extraReducers: {
      // create add Product Service
      [addSlider.pending]: (state) => {
        state.loading = true;
      },
      [addSlider.fulfilled]: (state, action) => {
        state.loading = false;
        //console.log(action.payload)
        // state.slider.product_service.push(action.payload.product_service);
      },
      [addSlider.rejected]: (state, action) => {
        state.loading = false;
        state.slider = action.payload;
      },
      //////update Api 
      [UpdateProductService.pending]: (state) => {
        state.loading = true;
      },
      [UpdateProductService.fulfilled]: (state, action) => {
        state.loading = false;
        console.log('action.payload',action.payload); 
        state.ProductService.product_service=state.ProductService.product_service.map((ele)=>
        ele._id===action.payload.product_service._id?action.payload.product_service:ele
     );
      },
      [UpdateProductService.rejected]: (state, action) => {
        state.loading = false;
        state.ProductService = action.payload;
      },
  
  
      /// get all product and service
      [getAllSlider.pending]: (state) => {
        state.loading = true;
      },
      [getAllSlider.fulfilled]: (state, action) => {
        state.loading = false;
        state.Slider = action.payload;
      },
      [getAllSlider.rejected]: (state, action) => {
        state.loading = false;
        state.Slider = action.payload;
      },
  
      //// deleteProduct_service
      [deleteSlider.pending]: (state) => {
        state.loading = true;
      },
      [deleteSlider.fulfilled]: (state, action) => {
        state.loading = false;
        const { _id } = action.payload.slider;
        if (_id) {
          state.Slider.slider=
            state.Slider.slider.filter((ele) => ele._id !== _id);
        }
      },
    },
  });
  
  export default Slider.reducer;
  