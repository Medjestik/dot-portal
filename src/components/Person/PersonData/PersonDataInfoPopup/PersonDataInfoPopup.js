import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonDataInfoPopup({ isOpen, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_small' name='person-data-info-popup' action='#' noValidate onSubmit={handleSubmit}>
        <h2 className='popup__title'>Данные</h2>
        <p className='popup__subtitle'>Просмотр и изменение персональных данных.</p>
        <button className='popup__btn-back' type='submit'>Назад</button>
      </form>
    </Popup>
  )
}

export default PersonDataInfoPopup;