import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Country from './components/Country';
import City from './components/City';
import './App.css';
import State from './components/State';
import DropDown from './components/DropDown';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Country/>}/>
        <Route path='/state' element={<State/>}/>
        <Route path='/city' element={<City/>}/>
        <Route path='/dropdown' element={<DropDown/>}/>
        
      </Routes>

    </Router>  );
}

export default App;
