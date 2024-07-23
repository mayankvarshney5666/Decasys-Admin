import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";


const apiUrl = process.env.REACT_APP_API_URL;


   export const addfollowup=createAsyncThunk("addfollowup",async(data,{rejectWithValue})=>{
           
        const responce=await fetch(`${apiUrl}/add_followup_lead/`,{
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










export const followup=createSlice({
    name:"followup",
    initialState:{
        followup:[],
       loading:false,  
       error:null,
       message:'', 
    },
    extraReducers:{
      // create addfollowup
       [addfollowup.pending]:(state) =>{
           state.loading=true; 
       },
       [addfollowup.fulfilled]:(state,action) =>{
           state.loading=false;
              console.log(action.payload)
             // state.followup.followuplead.push(action.payload?.followuplead['0']);  
        
       },
       [addfollowup.rejected]:(state,action) =>{
           state.loading=false;
           state.followup=action.payload; 
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

      


       },
})

export default  followup.reducer;