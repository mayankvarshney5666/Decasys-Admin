// Modal.js
import React from 'react';

const Modal = ({ event, onClose }) => {
    console.log('Modal received props:', event, onClose);
  return (
    <div className="modal">
      {/* Your modal content goes here */}
      <h2>Event Details</h2>
      <p>Title: {event.title}</p>
      <p>Start: {event.start.toLocaleString()}</p>
      <p>End: {event.end.toLocaleString()}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Modal;
