import React from 'react';
import './Header.css';
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__img'></div>
        <h3 className='header__name'>Костюлин Иван Алексеевич</h3>
        <nav className='header__nav'>
          <NavLink className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/person'>
            <div className='header__nav-link-icon'>
              <div className='header__nav-link-icon_type_person'></div>
            </div>
            <p className='header__nav-link-text'>Личный кабинет</p>
          </NavLink>
          <NavLink className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/education/semester'>
            <div className='header__nav-link-icon'>
              <div className='header__nav-link-icon_type_education'></div>
            </div>
            <p className='header__nav-link-text'>Обучение</p>
          </NavLink>
          <NavLink className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/webinars'>
            <div className='header__nav-link-icon'>
              <div className='header__nav-link-icon_type_webinar'></div>
            </div>
            <p className='header__nav-link-text'>Вебинары</p>
          </NavLink>
          <NavLink className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/rating'>
            <div className='header__nav-link-icon'>
              <div className='header__nav-link-icon_type_rating'></div>
            </div>
            <p className='header__nav-link-text'>Рейтинг</p>
          </NavLink>
          <NavLink className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/documents'>
            <div className='header__nav-link-icon'>
              <div className='header__nav-link-icon_type_document'></div>
            </div>
            <p className='header__nav-link-text'>Документы</p>
          </NavLink>
          <NavLink className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/library'>
            <div className='header__nav-link-icon'>
              <div className='header__nav-link-icon_type_library'></div>
            </div>
            <p className='header__nav-link-text'>Библиотека</p>
          </NavLink>
        </nav>
        
        <button className='header__nav-link header__nav-link_type_logout'>
          <div className='header__nav-link-icon'>
            <div className='header__nav-link-icon_type_logout'></div>
          </div>
          <p className='header__nav-link-text'>Выйти</p>
        </button>

      </div>

    </header>
  );
}

export default Header;