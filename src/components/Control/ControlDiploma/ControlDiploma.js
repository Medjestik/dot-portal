import React from 'react';
import './ControlDiploma.css';
import { Route, Routes } from 'react-router-dom';
import SemesterHeader from '../../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import ControlDiplomaCheck from './ControlDiplomaCheck/ControlDiplomaCheck.js';
 
function ControlDiploma({ windowWidth, onLogout }) {

  return (
    <div className='control-diploma'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
      </SemesterHeader>

      <Routes>

        <Route exact path='/check/*' element={
            <ControlDiplomaCheck windowWidth={windowWidth} />
          }
        >
        </Route>

      </Routes>

    </div>
  );
}

export default ControlDiploma;