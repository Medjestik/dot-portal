import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonAdministrationInfoPopup({ isOpen, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'small'}
      formName={'person-administration-info-popup'} 
    >
      <h2 className='popup__title'>Деканат</h2>
      <p className='popup__subtitle'>Просмотр информации о сотрудниках деканата.</p>
      <button className='popup__btn-back' type='submit'>Назад</button>
    </Popup>
    )
}

export default PersonAdministrationInfoPopup;