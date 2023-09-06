import React from 'react';
import './ControlNavigate.css';
import ControlNavigateWebinar from './ControlNavigateWebinar/ControlNavigateWebinar.js';

function ControlNavigate({ windowWidth }) {

  return (
    <div className='control-navigate'>

      <ControlNavigateWebinar windowWidth={windowWidth} />
      
    </div>
  );
}

export default ControlNavigate; 