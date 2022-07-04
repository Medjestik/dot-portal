import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonNotificationInfoPopup({ isOpen, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_small' name='person-notification-info-popup' action='#' noValidate onSubmit={handleSubmit}>
        <h2 className='popup__title'>Уведомления</h2>
        <p className='popup__subtitle'>Просмотр, скачивание и загрузка персональных документов обучения.</p>
        <p className='popup__text'>Документы загружаются деканатом в режиме реального времени, при загрузке нового документа вам приходит <span className='popup__text-accent'>уведомление.</span></p>
        <button className='popup__btn-back' type='submit'>Назад</button>
      </form>
    </Popup>
  )
}

export default PersonNotificationInfoPopup;