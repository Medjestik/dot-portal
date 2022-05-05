import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonAdministrationInfoPopup({ isOpen, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_small' name='person-achievement-info-popup' action='#' noValidate onSubmit={handleSubmit}>
        <h2 className='popup__title'>Деканат</h2>
        <p className='popup__subtitle'>Просмотр информации о сотрудниках деканата.</p>
        <button className='popup__btn-back' type='submit'>Назад</button>
      </form>
    </Popup>
    )
}

export default PersonAdministrationInfoPopup;