import React from 'react';
import Popup from '../../../Popup/Popup.js';

function PersonDocumentInfoPopup({ isOpen, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'small'}
      formName={'person-document-info-popup'}
    >
      <h2 className='popup__title'>Документы</h2>
      <p className='popup__subtitle'>Просмотр, скачивание и загрузка персональных документов обучения.</p>
      <p className='popup__text'><span className='popup__text-accent'>Документы</span> загружаются деканатом в режиме реального времени, при загрузке нового документа вам приходит уведомление.</p>
      <button className='popup__btn-back' type='submit'>Назад</button>
    </Popup>
    )
}

export default PersonDocumentInfoPopup;