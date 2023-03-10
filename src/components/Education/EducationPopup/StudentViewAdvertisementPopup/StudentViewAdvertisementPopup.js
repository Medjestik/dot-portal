import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './StudentViewAdvertisementPopup.css';

function StudentViewAdvertisementPopup({ isOpen, onClose, currentAdvertisement, }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'education-student-view-advertisement-popup'}
    >

      <h2 className='popup__title'>Объявление</h2>

      <div className='popup__author'>
        {
          currentAdvertisement.authorImg
          ?
          <img className='popup__author-img' src={currentAdvertisement.authorImg} alt='аватар'></img>
          :
          <div className='popup__author-img'></div>
        }
        <div className='popup__author-info'>
          <h4 className='popup__author-name'>{currentAdvertisement.title}</h4>
          <p className='popup__author-text'>Автор: {currentAdvertisement.author}</p>
          <p className='popup__author-text'>Дата публикации: {currentAdvertisement.date}</p>
        </div>
      </div>

      <p className='popup__textarea popup__textarea_height_medium  scroll-inside'>{currentAdvertisement.text}</p>
      
      <button className='popup__btn-back' type='submit'>Назад</button>

    </Popup>
  )
}

export default StudentViewAdvertisementPopup;