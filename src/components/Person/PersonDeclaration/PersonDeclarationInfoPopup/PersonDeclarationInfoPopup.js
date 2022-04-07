import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonDeclarationInfoPopup({ isOpen, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_small' name='person-declaration-info-popup' action='#' noValidate onSubmit={handleSubmit}>
        <h2 className='popup__title'>Заявления</h2>
        <p className='popup__subtitle'>Просмотр, скачивание и загрузка заявлений по обучению.</p>
        <p className='popup__text'><span className='popup__text-accent'>Заявления</span>  и дополнительные файлы загружаются деканатом в режиме реального времени, при подгрузке нового файла вам приходит уведомление.</p>
        <button className='popup__btn-back' type='submit'>Назад</button>
      </form>
    </Popup>
    )
}

export default PersonDeclarationInfoPopup;