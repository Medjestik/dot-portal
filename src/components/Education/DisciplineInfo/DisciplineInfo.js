import React from 'react';
import './DisciplineInfo.css';

function DisciplineInfo({ children, type }) {

  return (
    <div className={`discipline-info discipline-info_type_${type}`}>
      {children}
    </div>
  );
}

export default DisciplineInfo;