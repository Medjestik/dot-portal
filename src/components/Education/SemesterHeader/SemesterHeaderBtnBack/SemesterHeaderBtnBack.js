import React from 'react';
import { useNavigate } from "react-router-dom";

function SemesterHeaderBtnBack({ onBack, isPerformFunction }) {

  const navigate = useNavigate();

  return (
    isPerformFunction
    ?
    <button className='semester-header__btn-back' type='button' onClick={() => onBack()}> 
      <p className='semester-header__btn-back-text'>Назад</p>
      <div className='semester-header__btn-back-arrow'></div>
    </button>
    :
    <button className='semester-header__btn-back' type='button' onClick={() => navigate(-1)}> 
      <p className='semester-header__btn-back-text'>Назад</p>
      <div className='semester-header__btn-back-arrow'></div>
    </button>
  );
}

export default SemesterHeaderBtnBack;