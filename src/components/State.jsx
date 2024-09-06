import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Country.css';
import StatePopUp from './StatePopUp';

const State = () => {
    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [population, setPopulation] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState(null);

    useEffect(() => {
        fetchCountries();
        fetchStates();
    }, []);

    const fetchStates = () => {
        axios.get('http://localhost:8080/states')
            .then(response => {
                setStates(response.data);
            })
            .catch(error => {
                console.error('Error fetching states:', error.message);
            });
    };

    const fetchCountries = () => {
        axios.get('http://localhost:8080/countries')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error('Error fetching countries:', error.message);
            });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const state = {
            name,
            code,
            population,
            country: selectedCountry,
        };

        if (editId) {
            axios.put(`http://localhost:8080/states/${editId}`, state)
                .then(() => {
                    fetchStates();
                    resetForm();
                })
                .catch(error => {
                    console.error('There was an error updating the state!', error);
                });

        } else {
            axios.post('http://localhost:8080/states', state)
                .then(() => {
                    fetchStates();
                    resetForm();
                })
                .catch(error => {
                    console.error('There was an error creating the state!', error);
                });
        }
    };

    const resetForm = () => {
        setEditId(null);
        setName('');
        setCode('');
        setPopulation('');
        setSelectedCountry('');
    };

    const handleEdit = (state) => {
        setEditId(state.id);
        setName(state.name);
        setCode(state.code);
        setPopulation(state.population);
        setSelectedCountry(state.country);
    };

    const handleView = (id) => {
        axios.get(`http://localhost:8080/states/${id}`)
            .then(response => {
                const state = response.data;
                setSelectedState(state);
            })
            .catch(error => {
                console.error('There was an error fetching the state details!', error);
            });
    };

    const handleCloseView = () => {
        setSelectedState(null);
    };

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this state?");
        if (isConfirmed) {
            axios.delete(`http://localhost:8080/states/${id}`)
                .then(() => {
                    fetchStates();
                })
                .catch(error => {
                    console.error('There was an error deleting the state!', error);
                });
        }
    };

    return (
        <>
            <div className="container">
                <h1>States Operations</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            placeholder="Enter the State Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="code">Code:</label>
                        <input
                            type="text"
                            placeholder="Enter the State Code"
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
                    <button type="submit">{editId ? 'Update State' : 'Create State'}</button>
                    <button type="button" onClick={resetForm}>Reset</button>
                </form>
            </div>

            <div className='tableData'>
                <h1>State Lists</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Population</th>
                            <th>Country </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {states.map(state => (
                            <tr key={state.id}>
                                <td>{state.name}</td>
                                <td>{state.code}</td>
                                <td>{state.population}</td>
                                <td>{state.country}</td>
                                <td>
                                    <button onClick={() => handleEdit(state)}>Edit</button>
                                    <button onClick={() => handleView(state.id)}>View</button>
                                    <button onClick={() => handleDelete(state.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedState && (
                <StatePopUp state={selectedState} onClose={handleCloseView} />
            )}
        </>
    );
};

export default State;


