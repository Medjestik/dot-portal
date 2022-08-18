import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonAchievementInfoPopup({ isOpen, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup 
      isOpen={isOpen} 
      onSubmit={handleSubmit}
      formWidth={'small'}
      formName={'person-achievement-info-popup'}
    >
      <h2 className='popup__title'>Рейтинг и достижения</h2>
      <p className='popup__subtitle'>Просмотр персональной оценки достижений в период обучения и рейтинга одногрунников.</p>
      <p className='popup__text'><span className='popup__text-accent'>Рейтинг и достижения</span> обновляются в режиме реального времени в зависимости от количества пройденных дисциплин семестра, удачно сданной сессии и персональных задач.</p>
      <button className='popup__btn-back' type='submit'>Назад</button>
    </Popup>
    )
}

export default PersonAchievementInfoPopup;