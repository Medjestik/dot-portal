import React from 'react';
import './ControlSemester.css';
import { Route, Routes } from 'react-router-dom';
import SemesterHeader from '../../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import ControlSemesterList from './ControlSemesterList/ControlSemesterList.js';
import ControlSemesterGroups from './ControlSemesterGroups/ControlSemesterGroups.js';
import ControlSemesterData from './ControlSemesterData/ControlSemesterData.js';
import ControlSemesterGroup from './ControlSemesterGroup/ControlSemesterGroup.js';
 
function ControlSemester({ windowWidth, onLogout }) {

  return (
    <div className='control-semester'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
      </SemesterHeader>

      <Routes>

        <Route exact path='/groups/*' element={
            <ControlSemesterGroups windowWidth={windowWidth} />
          }
        >
        </Route>

        <Route exact path='/group/:groupId' element={
            <ControlSemesterGroup windowWidth={windowWidth} />
          }
        >
        </Route>

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
