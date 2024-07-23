import React, {useEffect, useState} from 'react';
import Login from './Login';
import Domain from './Licence/Domain';
import Licenceform from './Licence/Licenceform';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import Loader from './Loader';
import {getHostingbydomain} from '../features/licenceSlice';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
export default function Main({lo}) {
    const navigate = useNavigate();
   useEffect(()=>{
    if(!lo){
     // navigate('/login');
    }
  
 },[]);
    const dispatch=useDispatch();
    const {hostings,loading} = useSelector((state)=>state.app);  
    //  change    
   const [isLogined, setIsLogined]= useState(false); 
   const [isDomain, setIsDomain] = useState(false);
   const [isLicenceStatus, setLicenceStatus] = useState(false);
   
  
   useEffect(()=>{
    var host=window.location.hostname;
    dispatch(getHostingbydomain(host));
   
   
          },[]);

    if(loading){    
        return(<Loader />); 
      }
    if(hostings[0]===null){         
        return(<Domain />);   
      }else{   
      
       let Lstatus = hostings[0]?.states;
         if (Lstatus === 'inactive') {
                     return(<Licenceform />);    
      }  
       
      if(!isLogined){   
        return(<Login />); 
       }
      
      
      }

  
}
