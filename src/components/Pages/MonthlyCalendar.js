import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import Modal from './Modal';

const MyCalendar = () => {
  const apiUrl = process.env.REACT_APP_API_URL;  
      const [data,setdata]=useState([]);
       const getCalanderData=async()=>{
        try {
            const responce = await axios.get(
              `${apiUrl}/get_calander_data`
            );
            setdata(responce?.data?.lead);
            } catch (error) {
            console.log(error);
          }
   };
 useEffect(()=>{
      getCalanderData();
   },[])
   const [showModal, setShowModal] = useState(false);
   const [selectedEvent, setSelectedEvent] = useState(null);
  const localizer = momentLocalizer(moment);
  const aaaaa=[];
  data.map((leads)=>{
        console.log(leads)
        aaaaa.push({'title':leads.massage_of_calander,'start':leads.followup_date,'end':leads.followup_date})
  })
   const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    };
  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <div>
    <Calendar
      localizer={localizer}
      events={aaaaa}
      startAccessor="start"
      endAccessor="end"
      views={['month', 'agenda']}
      style={{ height: 400 }}
      onSelectEvent={handleEventSelect} 
        />
    {showModal && (
        <Modal
          event={selectedEvent}
          onClose={closeModal}
        />
      )}
  </div>
  );
};

export default MyCalendar;
