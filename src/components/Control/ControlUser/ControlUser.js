import React from 'react';
import './ControlUser.css';
import { Route, Routes } from 'react-router-dom';
import SemesterHeader from '../../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import ControlUserAdd from './ControlUserAdd/ControlUserAdd.js';
 
function ControlUser({ windowWidth, onLogout }) {

  return (
    <div className='control-user'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
      </SemesterHeader>

      <Routes>

        <Route exact path='/add' element={
            <ControlUserAdd windowWidth={windowWidth} />
          }
        />

      </Routes>

    </div>
  );
}

export default ControlUser;
