import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";


const apiUrl = process.env.REACT_APP_API_URL;


   export const getEmployeeReport=createAsyncThunk("getEmployeeReport",async(data,{rejectWithValue})=>{
           
        const responce=await fetch(`${apiUrl}/get_call_log_by_id_date/`,{
            method:"POST",
            headers:{     
                "Content-Type":"application/json",
               }, 
               body:JSON.stringify(data) 
        })  
        const result=await responce.json();
       
      if(result.success===true){  
         
         return result;
    }else{  
        return rejectWithValue(result.message);
    }  
    
   });

   export const getAllFollowup=createAsyncThunk("getAllFollowup",async(_id,{rejectWithValue})=>{
    const responce=await fetch(`${apiUrl}/all_followup_lead_by_id/${_id}`);
    const result=await responce.json(); 
   
    if(result.success===true){    
        return result;   
   }else{  
       return rejectWithValue(result.message);
   }  
   })

   export const DeleteLeadSource=createAsyncThunk("DeleteLeadSource",async(_id,{rejectWithValue})=>{
        
      const responce=await fetch(`${apiUrl}/delete_lead_source/${_id}`,{
                        method:"DELETE",
          })

          const  result =await responce.json();

          
        
          if(result.success===true){     
            return result;   
       }else{  
           return rejectWithValue(result.message);
       }  
   })
export const EmployeeReport=createSlice({
    name:"EmployeeReport",
    initialState:{
        EmployeeReport:[],
       loading:false,  
       error:null,
       message:'', 
    },
    extraReducers:{
      // create addfollowup
       [getEmployeeReport.pending]:(state) =>{
           state.loading=true; 
       },
       [getEmployeeReport.fulfilled]:(state,action) =>{
           state.loading=false;
           //state.EmplstateoyeeReport.push([]); 
         //  state.EmployeeReport.splice(0, EmployeeReport.length);
              state.EmployeeReport.unshift(action.payload);  
        
       },
       [getEmployeeReport.rejected]:(state,action) =>{
           state.loading=false;
           state.EmployeeReport=action.payload;  
       }, 
       /// get Alll lead Source


       [getAllFollowup.pending]:(state) =>{
           state.loading=true; 
       },
       [getAllFollowup.fulfilled]:(state,action) =>{
           state.loading=false;
         ///  console.log(action.payload.followuplead)
          state.followup=action.payload; 
          
       },
       [getAllFollowup.rejected]:(state,action) =>{
           state.loading=false;
           state.followup=action.payload; 
       }, 

       ///  DeleteLeadSource

       },
})

export default  EmployeeReport.reducer;