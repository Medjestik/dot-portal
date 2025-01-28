import React from 'react';
import './ControlNavigate.css';
import ControlNavigateWebinar from './ControlNavigateWebinar/ControlNavigateWebinar.js';
import ControlNavigateUser from './ControlNavigateUser/ControlNavigateUser.js';
import ControlNavigateGroup from './ControlNavigateGroup/ControlNavigateGroup.js';
import ControlNavigateDiploma from './ControlNavigateDiploma/ControlNavigateDiploma.js';
import ControlNavigateSemester from './ControlNavigateSemester/ControlNavigateSemester.js';
import ControlNavigateReport from './ControlNavigateReport/ControlNavigateReport.js';

function ControlNavigate({ windowWidth }) {

  return (
    <div className='control-navigate'>

      <ControlNavigateUser windowWidth={windowWidth} />

      <ControlNavigateGroup windowWidth={windowWidth} />

      <ControlNavigateWebinar windowWidth={windowWidth} />

      <ControlNavigateDiploma windowWidth={windowWidth} />

      <ControlNavigateSemester windowWidth={windowWidth} />

      <ControlNavigateReport windowWidth={windowWidth} />

    </div>
  );
}

export default ControlNavigate;
  