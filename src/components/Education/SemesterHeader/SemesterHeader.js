import React from 'react';
import './SemesterHeader.css';
import SemesterHeaderNav from './SemesterHeaderNav/SemesterHeaderNav.js';

function SemesterHeader({ onLogout, children }) {

  return (
    <div className='semester-header'>

      {children}

      <SemesterHeaderNav onLogout={onLogout} />

    </div>
  );
}

export default SemesterHeader;