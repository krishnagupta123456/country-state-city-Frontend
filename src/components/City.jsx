import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Country.css';
import CityPopUp from './CityPopUp';

const City = () => {

    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [population, setPopulation] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        fetchCountries();
        fetchCities();
    }, []);

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


    const fetchCities = () => {
        axios.get('http://localhost:8080/cities')
            .then(response => {
                setCities(response.data);
            })
            .catch(error => {
                console.error('Error fetching cities:', error.message);
            });
    };


    const fetchCountries = () => {
        axios.get('http://localhost:8080/countries')
            .then(response => {
                setCountries(response.data);
                console.log("Country data is here: ", response.data)
            })
            .catch(error => {
                console.error('Error fetching countries:', error.message);
            });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const city = {
            name,
            code,
            population,
            country: selectedCountry,
            state: selectedState,
        };

        if (editId) {
            axios.put(`http://localhost:8080/cities/${editId}`, city)
                .then(() => {
                    fetchCities();
                    resetForm();
                })
                .catch(error => {
                    console.error('There was an error updating the city!', error);
                });

        } else {
            axios.post('http://localhost:8080/cities', city)
                .then(() => {
                    fetchCities();
                    resetForm();
                })
                .catch(error => {
                    console.error('There was an error creating the city!', error);
                });
        }
    };

    const resetForm = () => {
        setEditId(null);
        setName('');
        setCode('');
        setPopulation('');
        setSelectedCountry('');
        setSelectedState('');
    };

    const handleEdit = (city) => {
        setEditId(city.id);
        setName(city.name);
        setCode(city.code);
        setPopulation(city.population);
        setSelectedCountry(city.country);
        setSelectedState(city.state);
    };


    const handleView = (id) => {
        axios.get(`http://localhost:8080/cities/${id}`)
            .then(response => {
                const city = response.data;
                setSelectedCity(city);
            })
            .catch(error => {
                console.error('There was an error fetching the city details!', error);
            });
    };

    const handleCloseView = () => {
        setSelectedCity(null);
    };

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this city?");
        if (isConfirmed) {
            axios.delete(`http://localhost:8080/cities/${id}`)
                .then(() => {
                    fetchCities();
                })
                .catch(error => {
                    console.error('There was an error deleting the city!', error);
                });
        }
    };

    return (
        <>
            <div className="container">
                <h1>Cities Operations</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            placeholder="Enter the City Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="code">Code:</label>
                        <input
                            type="text"
                            placeholder="Enter the City Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="population">Population:</label>
                        <input
                            type="text"
                            placeholder="Enter the number of Population"
                            value={population}
                            onChange={(e) => setPopulation(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="country">Country:</label>
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            required
                        >
                            <option value="">Select Country</option>
                            {countries.map(country => (
                                <option key={country.id} value={country.name}>{country.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="state">State:</label>
                        <select
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            required
                        >
                            <option value="">Select State </option>
                            {states.map(state => (
                                <option key={state.id} value={state.name}>{state.name}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit">{editId ? 'Update City' : 'Create City'}</button>
                    <button type="button" onClick={resetForm}>Reset</button>
                </form>
            </div>

            <div className='tableData'>
                <h1>City Lists</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Population</th>
                            <th>Country </th>
                            <th>State</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map(city => (
                            <tr key={city.id}>
                                <td>{city.name}</td>
                                <td>{city.code}</td>
                                <td>{city.population}</td>
                                <td>{city.country}</td>
                                <td>{city.state}</td>

                                <td>
                                    <button onClick={() => handleEdit(city)}>Edit</button>
                                    <button onClick={() => handleView(city.id)}>View</button>
                                    <button onClick={() => handleDelete(city.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedCity && (
                <CityPopUp city={selectedCity} onClose={handleCloseView} />
            )}
        </>
    );
};

export default City;

