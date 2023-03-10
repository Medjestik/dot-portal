import React from 'react';
import './DisciplineInfo.css';

function DisciplineInfo({ children }) {

  return (
    <div className='discipline-info'>
      {children}
    </div>
  );
}

export default DisciplineInfo;