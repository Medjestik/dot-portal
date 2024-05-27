import React from 'react';
import './ControlNavigate.css';
import ControlNavigateWebinar from './ControlNavigateWebinar/ControlNavigateWebinar.js';
import ControlNavigateGroup from './ControlNavigateGroup/ControlNavigateGroup.js';
import ControlNavigateDiploma from './ControlNavigateDiploma/ControlNavigateDiploma.js';

function ControlNavigate({ windowWidth }) {

  return (
    <div className='control-navigate'>

      <ControlNavigateGroup windowWidth={windowWidth} />

      <ControlNavigateWebinar windowWidth={windowWidth} />

      <ControlNavigateDiploma windowWidth={windowWidth} />

    </div>
  );
}

export default ControlNavigate;