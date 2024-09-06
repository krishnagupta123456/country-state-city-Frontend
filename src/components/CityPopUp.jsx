import React from 'react';
import './CityPopUp.css';

const CityPopUp = ({ city, onClose }) => {
  if (!city) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn">Close</button>
        <h2 className='h1'>City Details</h2>
        <div className='text'>
          <p><strong>Name:</strong> {city.name}</p>
          <p><strong>Code:</strong> {city.code}</p>
          <p><strong>Population:</strong> {city.population}</p>
          <p><strong>Country:</strong> {city.country}</p>
          <p><strong>State:</strong> {city.state}</p>
        </div>
      </div>
    </div>
  );
};

export default CityPopUp;