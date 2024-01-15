import React from 'react';
import Popup from '../../../Popup/Popup.js';
import PreloaderPopup from '../../../Preloader/PreloaderPopup/PreloaderPopup.js';

function StudentViewCommentPopup({ isOpen, onClose, currentComment, isLoading }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'education-student-view-comment-popup'}
    >

    {
      isLoading ?
      <PreloaderPopup />
      :
      <>

      <h2 className='popup__title popup__title_margin_bottom'>Комментарий для студента</h2>

      <div className='popup__author'>
        {
        currentComment.author_avatar_link
        ?
        <img className='popup__author-img popup__author-img_size_small' src={currentComment.author_avatar_link} alt='аватар'></img>
        :
        <div className='popup__author-img popup__author-img_size_small'></div>
        }
        <div className='popup__author-info'>
          <h4 className='popup__author-title'>{currentComment.author}</h4>
          <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Дата публикации: </span>{currentComment.date}</p>
        </div>
      </div>

      <textarea 
        className='popup__textarea popup__textarea_height_medium scroll-inside'
        defaultValue={currentComment.text}
        id='student-view-comment-text' 
        name='student-view-comment-text' 
        disabled
      >
      </textarea>

      <div className='popup__btn_margin_top'></div>
      
      <button className='popup__btn-back' type='submit'>Назад</button>

      </>
      }

    </Popup>
  )
}

export default StudentViewCommentPopup;