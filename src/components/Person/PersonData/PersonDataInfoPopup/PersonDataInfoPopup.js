import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonDataInfoPopup({ isOpen, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'small'}
      formName={'person-data-info-popup'}
    >
      <h2 className='popup__title'>Данные</h2>
      <p className='popup__subtitle'>Просмотр и изменение персональных данных.</p>
      <button className='popup__btn-back' type='submit'>Назад</button>
    </Popup>
  )
}

export default PersonDataInfoPopup;