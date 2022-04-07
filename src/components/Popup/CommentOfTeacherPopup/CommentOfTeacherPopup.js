import React from 'react';
import Popup from '../Popup.js';

function CommentOfTeacherPopup({ isOpen, onClose, comment }) {

  const isShowRequestError = false;

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  React.useEffect(() => {

  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_medium' name='person-area-teacher-comment-popup' action='#' noValidate onSubmit={handleSubmit}>
        <h2 className='popup__title'>Новый комментарий от преподавателя по дисциплине</h2>
        <div className='popup__text-container scroll'>
          <p className='popup__text'>{comment.text} 
          </p>
        </div>
        <button className='popup__btn-back' type='submit'>Назад</button>
        <span className={`popup__input-error ${isShowRequestError && 'popup__input-error_status_show'}`}>К сожалению, произошла ошибка</span>
      </form>
    </Popup>
  )
}

export default CommentOfTeacherPopup; 