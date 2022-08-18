import React from 'react';
import Popup from '../Popup.js';

function SemesterCommentPopup({ isOpen, onClose, comment }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'person-area-teacher-comment-popup'}
    >
      <h2 className='popup__title'>Комментарий преподавателя по&nbsp;дисциплине</h2>
      <div className='popup__text-container scroll'>
        <p className='popup__text'>{comment}
        </p>
      </div>
      <button className='popup__btn-back' type='submit'>Назад</button>
    </Popup>
  )
}

export default SemesterCommentPopup;