import React from 'react';
import Popup from '../Popup.js';

function SemesterCommentPopup({ isOpen, onClose, comment }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className='popup__form popup__form_type_medium' name='person-area-teacher-comment-popup' action='#' noValidate onSubmit={handleSubmit}>
        <h2 className='popup__title'>Комментарий преподавателя по&nbsp;дисциплине</h2>
        <div className='popup__text-container scroll'>
          <p className='popup__text'>{comment}
          </p>
        </div>
        <button className='popup__btn-back' type='submit'>Назад</button>
      </form>
    </Popup>
  )
}

export default SemesterCommentPopup;