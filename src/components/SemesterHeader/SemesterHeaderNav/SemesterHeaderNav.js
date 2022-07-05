import React from 'react';
import '../SemesterHeader.css';
import { NavLink } from "react-router-dom";
import { notificationIcon, homeIcon, errorIcon, exitIcon } from '../SemesterHeaderIcons/SemesterHeaderIcons.js'

function SemesterHeaderNav({ onLogout }) {
return (
  <ul className='semester-header__nav-list'>
    <li className='semester-header__nav-item'>
      <NavLink className={({ isActive }) => 'semester-header__nav-item-container ' + (isActive ? 'semester-header__nav-item-container_type_active' : '')} to='/person'>
        { homeIcon }
      </NavLink>
    </li>
    <li className='semester-header__nav-item'>
      <NavLink className={({ isActive }) => 'semester-header__nav-item-container ' + (isActive ? 'semester-header__nav-item-container_type_active' : '')} to='/notifications'>
        { notificationIcon }
      </NavLink>
    </li>
    <li className='semester-header__nav-item'>
      <div className='semester-header__nav-item-container'>
        { errorIcon }
      </div>
    </li>
    <li className='semester-header__nav-item'>
      <div className='semester-header__nav-item-container' onClick={onLogout}>
        { exitIcon }
      </div>
    </li>
  </ul>
)}

export default SemesterHeaderNav;