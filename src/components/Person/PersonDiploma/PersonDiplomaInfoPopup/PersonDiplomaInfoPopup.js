import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonDiplomaInfoPopup({ isOpen, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_small' name='person-document-info-popup' action='#' noValidate onSubmit={handleSubmit}>
        <h2 className='popup__title'>ВКР</h2>
        <p className='popup__subtitle'>Просмотр темы выпускной квалификационной работы, ФИО дипломного руководителя, загрузка работы на антиплагиат.</p>
        <p className='popup__text'><span className='popup__text-accent'>Информация о ВКР</span> доступна с 7-8 семестрах обучения и обновляется в режиме реального времени в зависимости от внесенных изменений.</p>
        <button className='popup__btn-back' type='submit'>Назад</button>
      </form>
    </Popup>
    )
}

export default PersonDiplomaInfoPopup;