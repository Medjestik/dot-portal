import React from 'react';
import './Semester.css';

function Semester({ isDisciplineOpen, backToSemester }) {

  return (
    <div className='semester'>
      {
        isDisciplineOpen 
        ?
        <div className='semester__btn-back' onClick={backToSemester}>
          <p className='semester__btn-back-text'>Назад</p>
          <div className='semester__btn-back-arrow'></div>
        </div>
        :
        <div className='semester__select'>
          <p className='semester__select-title'>Семестр</p>
          <div className='semester__select-arrow'></div>
        </div>
      }
      <ul className='semester__control-list'>
        <li className='semester__control-item'>
          <div className='semester__control-item-container'>
            <button className='semester__control-btn semester__control-btn_type_notifications' type='button'></button>
          </div>
        </li>
        <li className='semester__control-item'>
          <div className='semester__control-item-container'>
            <button className='semester__control-btn semester__control-btn_type_home' type='button'></button>
          </div>
        </li>
        <li className='semester__control-item'>
          <div className='semester__control-item-container'>
            <button className='semester__control-btn semester__control-btn_type_exit' type='button'></button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Semester;