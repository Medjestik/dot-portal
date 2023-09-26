import React from 'react';
import './ControlGroup.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SemesterHeader from '../../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import ControlGroupActive from './ControlGroupActive/ControlGroupActive.js';
import ControlGroupCompleted from './ControlGroupCompleted/ControlGroupCompleted.js';
 
function ControlGroup({ windowWidth, onLogout }) {

  const navigate = useNavigate();

  return (
    <div className='control-group'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => navigate('/control')} isPerformFunction={true} />
      </SemesterHeader>

      <Routes>

        <Route exact path='/active/*' element={
            <ControlGroupActive windowWidth={windowWidth} />
          }
        >
        </Route>

        <Route exact path='/completed/*' element={
            <ControlGroupCompleted windowWidth={windowWidth} />
          }
        >
        </Route>

        <Route exact path='/:groupId' element={
            <ControlGroupActive windowWidth={windowWidth} />
          }
        >
        </Route>

      </Routes>

    </div>
  );
}

export default ControlGroup;