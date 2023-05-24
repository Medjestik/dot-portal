import React from 'react';
import Popup from '../../Popup/Popup.js';

function CuratorViewStudentPopup({ isOpen, onClose, currentStudent }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  console.log(currentStudent);

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'large'}
    formName={'curator-view-student-popup'}
    >

      <h2 className='popup__title popup__title_margin_bottom'>Информация о студенте</h2>

      <div className='popup__author'>
        {
        currentStudent.pict_url
        ?
        <img className='popup__author-img' src={currentStudent.pict_url} alt='аватар'></img>
        :
        <div className='popup__author-img'></div>
        }
        <div className='popup__author-info'>
          <h4 className='popup__author-title'>{currentStudent.fullname}</h4>
          <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Логин: </span>{currentStudent.login || ''}</p>
        </div>
      </div>

      <div className='popup__row'>
        <div className='popup__row-item'>
          <h6 className='popup__row-title popup__row-title_margin_right'>Почта:</h6>
          <p className='popup__row-text'>{currentStudent.email || ''}</p>
        </div>
        <div className='popup__row-item'>
          <h6 className='popup__row-title popup__row-title_margin_right'>Телефон:</h6>
          <p className='popup__row-text'>{currentStudent.phone || ''}</p>
        </div>
      </div>

      <div className='popup__btn_margin_top'></div>
      
      <button className='popup__btn-back' type='submit'>Назад</button>

    </Popup>
  )
}

export default CuratorViewStudentPopup;