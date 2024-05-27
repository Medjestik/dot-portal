import React from 'react';
import './HeaderMobile.css';
import personIcon from '../../../images/header/person.svg';
import educationIcon from '../../../images/header/education.svg';
import webinarIcon from '../../../images/header/webinar.svg';
import courseIcon from '../../../images/header/discipline.svg';
import documentIcon from '../../../images/header/document.svg';
import controlIcon from '../../../images/header/journal.svg';
import libraryIcon from '../../../images/header/library.svg';
import notificationIcon from '../../../images/header/notification.svg';
import calendarIcon from '../../../images/header/calendar.svg';

function HeaderMobile({ showMobileMenu, pathname }) {

  function defineLink(path) {
    let linkText= '';
    let linkImg = personIcon;
    if (path.includes('person')) { linkText = 'Личный кабинет'; linkImg = personIcon; } 
    else if (path.includes('semester')) { linkText = 'Обучение'; linkImg = educationIcon; }
    else if (path.includes('webinars')) { linkText = 'Вебинары'; linkImg = webinarIcon; }
    else if (path.includes('courses')) { linkText = 'Курсы'; linkImg = courseIcon; }
    else if (path.includes('library')) { linkText = 'Библиотека'; linkImg = libraryIcon; }
    else if (path.includes('notifications')) { linkText = 'Уведомления'; linkImg = notificationIcon; }
    else if (path.includes('events')) { linkText = 'Календарь'; linkImg = calendarIcon; }
    else if (path.includes('curator')) { linkText = 'Куратор'; linkImg = controlIcon; }
    else if (path.includes('control')) { linkText = 'Управление'; linkImg = controlIcon; }
    return (
      <>
      <h2 className='header-mobile__title'>{linkText}</h2>
      <img className='header-mobile__btn' src={linkImg} alt='иконка'></img>
      </>
    )
  }

  return (
    <div className='header-mobile'>
      <button className='header-mobile__btn header-mobile__btn_type_menu' type='button' onClick={showMobileMenu}></button>
      {defineLink(pathname)}
    </div>
  );
}

export default HeaderMobile;