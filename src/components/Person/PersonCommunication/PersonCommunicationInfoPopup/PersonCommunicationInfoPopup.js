import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonCommunicationInfoPopup({ isOpen, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'small'}
      formName={'person-communication-info-popup'}
    >
      <h2 className='popup__title'>Общение</h2>
      <p className='popup__subtitle'>Доставление ссылок на социальные сети, просмотр данных одногруппников для налаживания с ними контакта :)</p>
      <p className='popup__text'><span className='popup__text-accent'>Ссылки на социальные сети</span> отражаются в режиме реального времени в зависимости от изменений данных одногруппников.</p>
      <button className='popup__btn-back' type='submit'>Назад</button>
    </Popup>
  )
}

export default PersonCommunicationInfoPopup;