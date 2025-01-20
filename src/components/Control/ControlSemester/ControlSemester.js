import React from 'react';
import './ControlSemester.css';
import { Route, Routes } from 'react-router-dom';
import SemesterHeader from '../../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import ControlSemesterList from './ControlSemesterList/ControlSemesterList.js';
import ControlSemesterData from './ControlSemesterData/ControlSemesterData.js';
 
function ControlSemester({ windowWidth, onLogout }) {

  return (
    <div className='control-diploma'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
      </SemesterHeader>

      <Routes>

        <Route exact path='/list' element={
            <ControlSemesterList windowWidth={windowWidth} />
          }
        >
        </Route>

        <Route exact path='/:semesterId' element={
            <ControlSemesterData windowWidth={windowWidth} />
          }
        >
        </Route>

      </Routes>

    </div>
  );
}

export default ControlSemester;