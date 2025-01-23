import React from 'react';
import './ControlReport.css';
import { Route, Routes } from 'react-router-dom';
import SemesterHeader from '../../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import ControlReportGroup from './ControlReportGroup/ControlReportGroup.js';
import ControlReportUser from './ControlReportUser/ControlReportUser.js';
 
function ControlReport({ windowWidth, onLogout }) {

  return (
    <div className='control-report'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
      </SemesterHeader>

      <Routes>

        <Route exact path='/group' element={
            <ControlReportGroup windowWidth={windowWidth} />
          }
        >
        </Route>

        <Route exact path='/user' element={
            <ControlReportUser windowWidth={windowWidth} />
          }
        >
        </Route>

      </Routes>

    </div>
  );
}

export default ControlReport;