import React from 'react';
import './NotificationPopup.css';
import Popup from '../Popup.js';
import PreloaderPopup from '../../Preloader/PreloaderPopup/PreloaderPopup.js';
import logo from '../../../images/rut-avatar.png';

function NotificationPopup({ isOpen, onClose, notification, isLoading }) {

  const [creator, setCreator] = React.useState({ name: '', pic: '' });

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  function defineCreator(elem) {
    console.log(elem);
    if (elem.type === 'system') {
      setCreator({ name: 'Техническая поддержка', pic: elem.tutor.pict_url });
    } else if (elem.type === 'news') {
      setCreator({ name: 'РУТ (МИИТ)', pic: logo });
    } else {
      setCreator({ name: elem.tutor.fullname, pic: elem.tutor.pict_url });
    }
  }

  React.useEffect(() => {
    if (!isLoading) {
      defineCreator(notification);
    }
    return (() => {
      setCreator({ name: '', pic: '' });
    })
  }, [isLoading, notification])

  console.log(notification);

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_medium' name='person-area-notification-popup' action='#' noValidate onSubmit={handleSubmit}>
      {
        isLoading ?
        <PreloaderPopup />
        :
        <>
        <div className='notification-popup__creator-container'>
          {
            creator.pic
            ?
            <img className='notification-popup__creator-img' src={creator.pic} alt=''></img>
            :
            <div className='notification-popup__creator-img'></div>
          }
          <div className='notification-popup__creator-info'>
            <h3 className='notification-popup__creator-name'>{creator.name}</h3>
            <span className='notification-popup__creator-date'>{notification.date}</span>
          </div>
        </div>
        <h2 className='popup__title'>{notification.title}</h2>
        <div className='popup__text-container scroll'>
          <p className='popup__text'>{notification.text}</p>
        </div>
        <button className='popup__btn-back' type='submit'>Назад</button>
        </>
      }
      </form>
    </Popup>
  )
}

export default NotificationPopup;