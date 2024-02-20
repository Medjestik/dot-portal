import React from 'react';
import './ControlGroup.css';
import { Route, Routes } from 'react-router-dom';
import SemesterHeader from '../../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
import ControlGroupActive from './ControlGroupActive/ControlGroupActive.js';
import ControlGroupCompleted from './ControlGroupCompleted/ControlGroupCompleted.js';
import CuratorGroup from '../../Curator/CuratorGroup/CuratorGroup.js';
 
function ControlGroup({ windowWidth, onLogout }) {

  return (
    <div className='control-group'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
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

        <Route exact path='/:groupId/*' element={
            <CuratorGroup windowWidth={windowWidth} role='control' />
          }
        >
        </Route>

      </Routes>

    </div>
  );
}

export default ControlGroup;