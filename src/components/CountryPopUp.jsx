import React from 'react';
import './CityPopUp.css';

const CountryPopUp = ({ country, onClose }) => {
  if (!country) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn">Close</button>
        <h2 className='h1'>Country Details</h2>
        <div className='text'>
          <p><strong>Name:</strong> {country.name}</p>
          <p><strong>Code:</strong> {country.code}</p>
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Population:</strong> {country.population}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryPopUp;