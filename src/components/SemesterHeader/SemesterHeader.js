import React from 'react';
import './SemesterHeader.css';
import SemesterHeaderNav from './SemesterHeaderNav/SemesterHeaderNav.js';

function SemesterHeader({ semesterInfo, onLogout }) {

  return (
    <div className='semester-header'>

      <div className='semester-header__btn-empty'>
        <p className='semester-header__btn-back-text'>Семестр {semesterInfo[semesterInfo.length - 1].position}</p>
      </div>

      <SemesterHeaderNav onLogout={onLogout} />

    </div>
  );
}

export default SemesterHeader;