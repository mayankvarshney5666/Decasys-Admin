


import React, { useEffect, useState } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Login from '../Login';

const ProtectedRoute = ({ component: Component,...props}) => {
  const apiUrl = process.env.REACT_APP_API_URL;  
  const [isLogined, setIsLogined]= useState(false); 
  const isTokenPresent=()=>{   
      if(localStorage.getItem('token')){ return true;    }
      else return false;
    }
     useEffect(() => {       
     const tokenPresent= isTokenPresent()
      if(tokenPresent)
     {   
      setIsLogined(true);
     }else{
      setIsLogined(false);
     }
   }, [])

};

export default ProtectedRoute;