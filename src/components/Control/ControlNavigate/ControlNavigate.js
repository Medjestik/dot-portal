import React from 'react';
import './ControlNavigate.css';
import ControlNavigateWebinar from './ControlNavigateWebinar/ControlNavigateWebinar.js';
import ControlNavigateGroup from './ControlNavigateGroup/ControlNavigateGroup.js';

function ControlNavigate({ windowWidth }) {

  return (
    <div className='control-navigate'>

      <ControlNavigateGroup windowWidth={windowWidth} />

      <ControlNavigateWebinar windowWidth={windowWidth} />

    </div>
  );
}

export default ControlNavigate;