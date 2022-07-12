import React from 'react';
import '../SemesterHeader.css';
import { NavLink } from "react-router-dom";

function SemesterHeaderNav({ onLogout }) {
return (
  <ul className='semester-header__nav-list'>
    <li className='semester-header__nav-item'>
      <NavLink className={({ isActive }) => 'semester-header__nav-item-container ' + (isActive ? 'semester-header__nav-item-container_type_active' : '')} to='/person'>
        <div className='semester-header__nav-btn semester-header__nav-btn_type_home'></div>
      </NavLink>
    </li>
    <li className='semester-header__nav-item'>
      <NavLink className={({ isActive }) => 'semester-header__nav-item-container ' + (isActive ? 'semester-header__nav-item-container_type_active' : '')} to='/notifications'>
        <div className='semester-header__nav-btn semester-header__nav-btn_type_notification'></div>
      </NavLink>
    </li>
    <li className='semester-header__nav-item'>
      <NavLink className={({ isActive }) => 'semester-header__nav-item-container ' + (isActive ? 'semester-header__nav-item-container_type_active' : '')} to='/events'>
          <div className='semester-header__nav-btn semester-header__nav-btn_type_calendar'></div>
      </NavLink>
    </li>
    <li className='semester-header__nav-item'>
      <div className='semester-header__nav-item-container' onClick={onLogout}>
        <div className='semester-header__nav-btn semester-header__nav-btn_type_exit'></div>
      </div>
    </li>
  </ul>
)}

export default SemesterHeaderNav;