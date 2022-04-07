import React from 'react';
import Popup from '../Popup.js';

function ConfirmRemovePopup({ isOpen, onClose, file }) {

  const isShowRequestError = false;

  function handleSubmit(e) {
    e.preventDefault();
  }

  React.useEffect(() => {

  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_small' name='person-area-confirm-remove-popup' action='#' noValidate onSubmit={handleSubmit}>
        <h2 className='popup__title'>Удаление файла</h2>
        <p className='popup__subtitle'>Вы действительно хотите удалить файл?</p>

        <div className='popup__btn-container'>
          <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
          <button className='popup__btn-save' type='submit'>Сохранить</button>
        </div>
        <span className={`popup__input-error ${isShowRequestError && 'popup__input-error_status_show'}`}>К сожалению, произошла ошибка</span>
      </form>
    </Popup>
  )
}

export default ConfirmRemovePopup; 