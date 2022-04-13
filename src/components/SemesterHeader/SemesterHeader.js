import React from 'react';
import './SemesterHeader.css';
import { notificationIcon, homeIcon, errorIcon, exitIcon } from './SemesterHeaderIcons/SemesterHeaderIcons.js'

function SemesterHeader({ isDisciplineOpen, backToSemester }) {

  return (
    <div className='semester-header'>
      {
        isDisciplineOpen 
        ?
        <div className='semester-header__btn-back' onClick={backToSemester}> 
          <p className='semester-header__btn-back-text'>Назад</p>
          <div className='semester-header__btn-back-arrow'></div>
        </div>
        :
        <div className='semester-header__select'>
          <p className='semester-header__select-title'>Семестр</p>
          <div className='semester-header__select-arrow'></div>
        </div>
      }
      <ul className='semester-header__control-list'>
        <li className='semester-header__control-item'>
          <div className='semester-header__control-item-container'>
            { notificationIcon }
          </div>
        </li>
        <li className='semester-header__control-item'>
          <div className='semester-header__control-item-container'>
            { homeIcon }
          </div>
        </li>
        <li className='semester-header__control-item'>
          <div className='semester-header__control-item-container'>
            { errorIcon }
          </div>
        </li>
        <li className='semester-header__control-item'>
          <div className='semester-header__control-item-container'>
            { exitIcon }
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SemesterHeader;