import React , {Fragment, useState ,useEffect} from "react";
import {addlead,getAllLead } from "../../features/leadSlice";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../Loader";
import { AllUser } from "./AllUser";
import { Link } from "react-router-dom";
import { getAllAgent } from "../../features/agentSlice";
import { getAllStatus } from "../../features/statusSlice";
import axios from "axios";
import { toast } from "react-toastify";
function Register() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch=useDispatch(); 
  const {lead,loading} = useSelector((state)=>state.lead); 
  const { agent } = useSelector((state) => state.agent);
  const { Statusdata } = useSelector((state) => state.StatusData);
  const [LeadStatus,setLeadStatus]=useState();
  const [Leadagent,setLeadagent]=useState();
     
  useEffect(()=>{
    dispatch(getAllLead());  
    dispatch(getAllAgent()); 
    dispatch(getAllStatus());
  },[]);
 const BulkAction=async(e)=>{ 
      e.preventDefault();
  const updatedData = {
      leads,
      Leadagent,
      LeadStatus    
  };
     console.log(updatedData)

  try {
    const response = await axios.put(
      `${apiUrl}/BulkLeadUpdate/`,
      updatedData
    );
   
   if(response.data.success===false){
    toast.warn(response.data.message); 
    }
    if(response.data.success===true){
      window.location.reload(false); 
      toast.success(response.data.message); 

    }
  } catch (error) {
   
    toast.warn(error.response?.data?.message); 
  //  console.error('Error updating lead', error);
  }

 }
 const [leads, setLeadID] = useState([]);
 const [none,setnone]=useState('none');
 const handleChildData = (data) => {
    setLeadID(data);
    
  };

  const advanceserch=()=>{
    if(none=='none'){
      setnone('block');
    }else{
      setnone('none');
    }
  
  }


  
  

  return (
    <div>
      <div className="content-wrapper">
      
        <section className="content">
          <div className="container pl-0">
          
       
    <div className="panel-body  pr-0">
   <div className="row export-data">
  <div className="col-md-5 col-xs-12 pl-1 pt-2">
    <div className="row">
      <div className="col-md-4 col-sm-4 col-xs-6">
        <div className="btn-group btn-groupese">
          <Link className="btn btnes exports" to="#"> &nbsp; All User </Link>
        </div>
      </div>
      <div className="col-md-4 col-sm-4 mobil-nns col-xs-4">
      
      </div>
      <div className="col-md-4 col-sm-4 col-xs-6">
     
      </div>
      
    </div>
  </div>
  <div className="col-md-7 col-xs-12 ">
    <div className="ipades pt-2" >
      <form  onSubmit={BulkAction}>
        <div className="row">
         
        
          <div className="col-md-4 col-sm-4 col-xs-12 pl-0">
            {/* <input type="submit" className="button-57" defaultValue="Submit"  /> */}
          </div>
        </div>
      </form>
    </div>
  </div>



</div>

 
 <div className="pt-3 row pl-0">
    <div className="col-12 pl-0">
    <AllUser   sendDataToParent={handleChildData}  dataFromParent={none}/> 
    </div>
  
  </div>



           
    </div>
          </div>
      </section>  
      </div>
     
    </div>
  );
}

export default Register;
