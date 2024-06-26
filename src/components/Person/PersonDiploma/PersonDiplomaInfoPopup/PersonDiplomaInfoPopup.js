import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonDiplomaInfoPopup({ isOpen, onClose }) {

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
      formName={'person-diploma-info-popup'}
    >
      <h2 className='popup__title'>ВКР</h2>
      <p className='popup__subtitle'>Просмотр темы выпускной квалификационной работы, ФИО дипломного руководителя, загрузка работы на антиплагиат.</p>
      <p className='popup__text'><span className='popup__text-accent'>Загрузите работу и дождитесь проверки.</span></p>
      <p className='popup__text'>Если у вас возникают вопросы по проверке работы, вы можете обратиться к вашему куратору.</p>
      <button className='popup__btn-back' type='submit'>Назад</button>
    </Popup>
    )
}

export default PersonDiplomaInfoPopup;