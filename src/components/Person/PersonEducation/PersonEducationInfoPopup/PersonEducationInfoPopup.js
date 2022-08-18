import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonEducationInfoPopup({ isOpen, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'small'}
      formName={'person-education-info-popup'}
    >
      <h2 className='popup__title'>Обучение</h2>
      <p className='popup__subtitle'>Просмотр аналитики обучения и переход на интересующий семестр.</p>
      <p className='popup__text'><span className='popup__text-accent'>Статус обучения</span> обновляется в режиме реального времени в зависимости от суммарного количества пройденых дисциплин семестров.</p>
      <button className='popup__btn-back' type='submit'>Назад</button>
    </Popup>
    )
}

export default PersonEducationInfoPopup;