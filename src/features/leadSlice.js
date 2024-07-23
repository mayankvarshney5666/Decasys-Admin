import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;

export const addlead = createAsyncThunk(
  "addlead",
  async (data, { rejectWithValue }) => {
    const responce = await fetch(`${apiUrl}/add_lead/`,
      {
        method: "POST",
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

export const getAllLead = createAsyncThunk(
  "getAllLead",
  async (data, { rejectWithValue }) => {
    const responce = await fetch(
      `${apiUrl}/get_all_lead`
    );
    const result = await responce.json();

    if (result.success === true) {
      return result;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const getLeadById1 = createAsyncThunk(
  "getLeadById1",
  async (_id, { rejectWithValue }) => {
     
    const responce=await fetch(`${apiUrl}/get_lead_by_id/${_id}`,{
        method:"GET",
})
    const result = await responce.json();
     // console.log(result)
    if (result.success === true) {
      return result;
    } else {
      return rejectWithValue(result.message);
    }
  }
);



export const getLeadById=createAsyncThunk("getLeadById",async(_id,{rejectWithValue})=>{
        
    const responce=await fetch(`${apiUrl}/get_lead_by_id/${_id}`,{
                      method:"get",
        })

        const  result =await responce.json();
       // console.log(result)
        if(result.success===true){     
          return result;   
     }else{  
         return rejectWithValue(result.message);
     }  
 })

export const leadSource = createSlice({
  name: "lead",
  initialState: {
    lead: [],
    lead1: [],
    loading: false,
    error: null,
    message: "",
  },
  extraReducers: {
    // create add leadsource

    [addlead.pending]: (state) => {
      state.loading = true;
    },
    [addlead.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log(action.payload)
      // state.lead.lead.push(action.payload);
      state.message = action.payload.message;
    },
    [addlead.rejected]: (state, action) => {
      state.loading = false;
      state.lead = action.payload;
    },

    /// get Alll lead Source
    [getAllLead.pending]: (state) => {
      state.loading = true;
    },
    [getAllLead.fulfilled]: (state, action) => {
      state.loading = false;
      state.lead = action.payload;
    },
    [getAllLead.rejected]: (state, action) => {
      state.loading = false;
      state.lead = action.payload;
    },

    /// getLeadById


    [getLeadById.pending]: (state) => {
      state.loading = true;
    },
    [getLeadById.fulfilled]: (state, action) => {
      state.loading = false;

      state.lead1 = action.payload;
    },
    [getLeadById.rejected]: (state, action) => {
      state.loading = false; 
      state.lead1 = action.payload;
    },


  },
});

export default leadSource.reducer;
