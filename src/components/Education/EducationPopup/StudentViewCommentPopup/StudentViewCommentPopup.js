import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';

function StudentViewCommentPopup({ isOpen, onClose, currentAdvertisement, isLoading }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'education-student-view-comment-popup'}
    >

    {
      isLoading ?
      <PreloaderPopup />
      :
      <>

      <h2 className='popup__title popup__title_margin_bottom'>Комментарий преподавателя</h2>

      <div className='popup__author'>
        {
        currentAdvertisement.author_avatar_link
        ?
        <img className='popup__author-img' src={currentAdvertisement.author_avatar_link} alt='аватар'></img>
        :
        <div className='popup__author-img'></div>
        }
        <div className='popup__author-info'>
          <h4 className='popup__author-title'>{currentAdvertisement.author}</h4>
          <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Дата публикации: </span>{currentAdvertisement.date}</p>
        </div>
      </div>

      <p className='popup__textarea popup__textarea_height_medium scroll-inside'>{currentAdvertisement.text}</p>

      <div className='popup__btn_margin_top'></div>
      
      <button className='popup__btn-back' type='submit'>Назад</button>

      </>
      }

    </Popup>
  )
}

export default StudentViewCommentPopup;