import React from 'react';
import { useNavigate } from "react-router-dom";

function SemesterHeaderBtnBack({ onBack, isPerformFunction }) {

  const navigate = useNavigate();

  return (
    isPerformFunction
    ?
    <button className='semester-header__btn-back' type='button' onClick={() => onBack()}> 
      <div className='semester-header__btn-back-arrow'></div>
      <p className='semester-header__btn-back-text'>Назад</p>
    </button>
    :
    <button className='semester-header__btn-back' type='button' onClick={() => navigate(-1)}> 
      <div className='semester-header__btn-back-arrow'></div>
      <p className='semester-header__btn-back-text'>Назад</p>
    </button>
  );
}

export default SemesterHeaderBtnBack;