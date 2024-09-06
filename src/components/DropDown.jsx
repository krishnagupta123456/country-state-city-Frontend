
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const DropDown = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/countries")
      .then(
        Response => {
          setCountries(Response.data);
        }
      )
      .catch(error => {
        console.log(error)
      })

  }, [])

  //  useEffect(()=>{
  //   if (selectedCountry) {
  //       const selectedCountryObj = countries.find(country => country.id === parseInt(selectedCountry));
  //        setStates(selectedCountryObj.states);


  //       }
  //  },[selectedCountry ,countries])
  useEffect(() => {
    if (selectedCountry) {
      const selectedCountryObj = countries.find(
        (country) => country.name === selectedCountry
      );
      if (selectedCountryObj) {
        setStates(selectedCountryObj.states || []);
      } else {
        setStates([]);
      }
    } else {
      setStates([]);
    }
  }, [selectedCountry, countries]);

  return (
    <>
      <div className="container">
        <form>
          <div className='form-group'>
            <label htmlFor="country">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => { setSelectedCountry(e.target.value) }}>

              <option value="">Select a Country</option>
              {
                countries.map(country => (
                  <option key={country.id} value={country.name}>{country.name}</option>
                ))

              }
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor="state">State</label>
            <select
              value={selectedState}
              onChange={(e) => { setSelectedState(e.target.value) }}>

              <option value="">Select a State</option>
              {
                states.map(state => (
                  <option key={state.id} value={state.id}>{state.name}</option>
                ))

              }


            </select>
          </div>



        </form>
      </div>
    </>
  )
}

export default DropDown