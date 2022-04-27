import React from 'react';
import './Header.css';
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { personIcon, educationIcon, webinarIcon, ratingIcon, documentIcon, libraryIcon, logoutIcon } from './HeaderIcons/HeaderIcons.js';

function Header() {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className='header'>
      <div className='header__container'>
        {
          currentUser.avatar 
          ?
          <img className='header__img' src={currentUser.avatar} alt='аватар'></img>
          :
          <div className='header__img'></div>
        }
        
        <h3 className='header__name'>{currentUser.fullname || ''}</h3>
        <nav className='scroll header__nav'>
          <NavLink className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/person'>
            <div className='header__nav-link-icon'>
              <div className='header__nav-link-icon-container'>
                { personIcon }
              </div>
            </div>
            <p className='header__nav-link-text'>Личный кабинет</p>
          </NavLink>
          <NavLink className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/education/semester'>
            <div className='header__nav-link-icon'>
              <div className='header__nav-link-icon-container'>
                { educationIcon }
              </div>
            </div>
            <p className='header__nav-link-text'>Обучение</p>
          </NavLink>
          <NavLink className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/webinars'>
            <div className='header__nav-link-icon'>
              <div className='header__nav-link-icon-container'>
                { webinarIcon }
              </div>
            </div>
            <p className='header__nav-link-text'>Вебинары</p>
          </NavLink>

          {/*
            <NavLink className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/rating'>
              <div className='header__nav-link-icon'>
                <div className='header__nav-link-icon-container'>
                  { ratingIcon }
                </div>
              </div>
              <p className='header__nav-link-text'>Рейтинг</p>
            </NavLink>*/
          }

          <NavLink className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/document'>
            <div className='header__nav-link-icon'>
              <div className='header__nav-link-icon-container'>
                { documentIcon }
              </div>
            </div>
            <p className='header__nav-link-text'>Документы</p>
          </NavLink>
          <NavLink className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/library'>
            <div className='header__nav-link-icon'>
              <div className='header__nav-link-icon-container'>
                { libraryIcon }
              </div>
            </div>
            <p className='header__nav-link-text'>Библиотека</p> 
          </NavLink>
        </nav>
        
        <button className='header__nav-link header__nav-link_type_logout'>
          <div className='header__nav-link-icon'>
              <div className='header__nav-link-icon-container'>
                { logoutIcon }
              </div>
          </div>
          <p className='header__nav-link-text'>Выйти</p>
        </button>

      </div>

    </header>
  );
}

export default Header;