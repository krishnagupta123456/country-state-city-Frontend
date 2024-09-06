
import React from 'react';
import './CityPopUp.css';

const StatePopUp = ({ state, onClose }) => {
  if (!state) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn">Close</button>
        <h2 className='h1'>State Details</h2>
        <div className='text'>
          <p><strong>Name:</strong> {state.name}</p>
          <p><strong>Code:</strong> {state.code}</p>
          <p><strong>Population:</strong> {state.population}</p>
          <p><strong>Country:</strong> {state.country}</p>
        </div>
      </div>
    </div>
  );
};

export default StatePopUp;