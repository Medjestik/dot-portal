import React from 'react';
import './Journal.css';
import SemesterHeader from '../Education/SemesterHeader/SemesterHeader.js';
import SemesterHeaderBtnBack from '../Education/SemesterHeader/SemesterHeaderBtnBack/SemesterHeaderBtnBack.js';
 
function Journal({ windowWidth, onLogout }) {

  return (
    <div className='journal'>

      <SemesterHeader onLogout={onLogout}>
        <SemesterHeaderBtnBack onBack={() => {}} isPerformFunction={false} />
      </SemesterHeader>

      <div className='journal__container'>
       
      </div>
    </div>
  );
}

export default Journal; 