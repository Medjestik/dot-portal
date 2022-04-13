import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.js';
import Person from '../Person/Person.js';
import Education from '../Education/Education.js';
import Webinar from '../Webinar/Webinar.js';

function App() {

  return (
    <div className='page'>
      <div className='wrapper'>
        <div className='container'>
            <Header />
            <div className='main-container'>

              <Routes>
                <Route 
                exact 
                path='/person' 
                element={
                <Person />}
                />
              </Routes>

              <Routes>
                <Route 
                path='/education/*' 
                element={
                <Education />}
                />
              </Routes>

              <Routes>
                <Route 
                path='/webinars' 
                element={
                <Webinar />}
                />
              </Routes>

            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
