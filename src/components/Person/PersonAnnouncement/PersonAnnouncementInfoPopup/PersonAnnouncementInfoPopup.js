import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonAnnouncementInfoPopup({ isOpen, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'small'}
      formName={'person-communication-info-popup'}
    >
      <h2 className='popup__title'>Объявления</h2>
      <p className='popup__text'>В данном разделе представлен список объявлений <span className='popup__text-accent'>для вашей группы.</span></p>
      <button className='popup__btn-back' type='submit'>Назад</button>
    </Popup>
  )
}

export default PersonAnnouncementInfoPopup;