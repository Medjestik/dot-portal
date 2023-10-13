  
  import React from 'react';
  import Popup from '../../../Popup/Popup.js';
  
  function PersonWebinarInfoPopup({ isOpen, onClose }) {
  
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
        formName={'person-webinar-info-popup'}
      >
        <h2 className='popup__title'>Вебинары</h2>
        <p className='popup__text'>В данном разделе представлен список ближайших вебинаров, а также записи прошедших вебинаров.</p>
        <p className='popup__text'>Для просмотра выберите вебинар из списка и перейдите по ссылке.</p>
        <button className='popup__btn-back' type='submit'>Назад</button>
      </Popup>
      )
  }
  
  export default PersonWebinarInfoPopup;