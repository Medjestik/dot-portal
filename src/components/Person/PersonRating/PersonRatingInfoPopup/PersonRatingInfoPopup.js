import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonRatingInfoPopup({ isOpen, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'small'}
      formName={'person-rating-info-popup'}
    >
      <h2 className='popup__title'>Оценка дисциплин и преподавателей</h2>
      <p className='popup__subtitle'>Оценка по 5-ти балльной шкале преподавателя и дисциплины текущего семестра.</p>
      <p className='popup__text'><span className='popup__text-accent'>Оценка анонимна</span> и доступна для просмотра только сотрудникам деканата.
      </p>
      <button className='popup__btn-back' type='submit'>Назад</button>
    </Popup>
  )
}

export default PersonRatingInfoPopup;