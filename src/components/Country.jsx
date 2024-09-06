import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Country.css';
import CountryPopUp from './CountryPopUp';

const Country = () => {
    const [countries, setCountries] = useState([]);
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [capital, setCapital] = useState('');
    const [population, setPopulation] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = () => {
        axios.get('http://localhost:8080/countries')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error('Error fetching country:', error.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const country = { id: editId, name, code, capital, population };

        if (editId) {
            axios.put(`http://localhost:8080/countries/${editId}`, country)
                .then(() => {
                    fetchCountries();
                    resetForm();
                })
                .catch(error => {
                    console.error('There was an error updating the country!', error);
                });

        } else {
            axios.post('http://localhost:8080/countries', country)
                .then(() => {
                    fetchCountries();
                    resetForm();
                })
                .catch(error => {
                    console.error('There was an error creating the country!', error);
                });
        }
    };

    const handleEdit = (country) => {
        setEditId(country.id);
        setName(country.name);
        setCode(country.code);
        setCapital(country.capital);
        setPopulation(country.population);
    };

    const handleView = (id) => {
        axios.get(`http://localhost:8080/countries/${id}`)
            .then(response => {
                const country = response.data;
                setSelectedCountry(country);
            })
            .catch(error => {
                console.error('There was an error fetching the country details!', error);
            });
    };

    const handleCloseView = () => {
        setSelectedCountry(null);
    };

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this country?");
        if (isConfirmed) {
            axios.delete(`http://localhost:8080/countries/${id}`)
                .then(() => {
                    fetchCountries();
                })
                .catch(error => {
                    console.error('There was an error deleting the country!', error);
                });
        }
    };

    const resetForm = () => {
        setEditId(null);
        setName('');
        setCode('');
        setCapital('');
        setPopulation('');
    };

    return (
        <>
            <div className="container">
                <h1>Countries Operations</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            placeholder="Enter the Country Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="code">Code:</label>
                        <input
                            type="text"
                            placeholder="Enter the Country Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="capital">Capital:</label>
                        <input
                            type="text"
                            placeholder="Enter the Capital"
                            value={capital}
                            onChange={(e) => setCapital(e.target.value)}
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
                    <button type="submit">{editId ? 'Update Country' : 'Create Country'}</button>
                    <button type="button" onClick={resetForm}>Reset</button>
                </form>
            </div>

            <div className='tableData'>
                <h1>Country Lists</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country Code</th>
                            <th>Country Capital</th>
                            <th>Populations</th>
                            <th>Actions Perform</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map((country) => (
                            <tr key={country.id}>
                                <td>{country.name}</td>
                                <td>{country.code}</td>
                                <td>{country.capital}</td>
                                <td>{country.population}</td>
                                <td>
                                    <button onClick={() => handleEdit(country)}>Edit</button>
                                    <button onClick={() => handleView(country.id)}>View</button>
                                    <button onClick={() => handleDelete(country.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedCountry && (
                <CountryPopUp country={selectedCountry} onClose={handleCloseView} />
            )}
        </>
    );
};

export default Country;



