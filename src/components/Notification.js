import React, {useEffect, useState} from "react";

import { Toaster ,toast } from "react-hot-toast";
import { requestPermission, onMessageListener } from "../firebase";

function Notification(){

const [notification,setNotification]=useState({title:"",body:""});

useEffect(()=>{
        requestPermission();
   const unsubscribe=onMessageListener().then(payload=>{
    setNotification({
        title:'kkk',
        body:'kkkkkk'
    });
    toast.success(`${payload?.notification?.title}:${payload?.notification?.body}`,
   {
    duration:60000,
    position:"top-right"
   }
    )
   })
    return ()=>{
        unsubscribe.catch(err=>console.log("Failed :",err));
    };


    

},[]);
return (
    <div>
        <Toaster/>
    </div>
);
}
export default Notification;