import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './TeacherViewCommentsPopup.css';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext.js';

function TeacherViewCommentsPopup({ isOpen, onClose, onAddComment, onEditComment, currentStudent, }) {

  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  function renderComment(comment) {
    if (currentUser.id === comment.author_id) { 
      return (
        <h4 className='popup__item-name popup__item-name_type_active' onClick={() => onEditComment(comment)}>{comment.text}</h4>
      )
    } else {
      return (
        <h4 className='popup__item-name'>{comment.text}</h4>
      )
    }
  }

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'education-teacher-view-comments-popup'}
    >
      <h2 className='popup__title'>Комментарии для студента</h2>
      <p className='popup__subtitle'>Студент: {currentStudent.student.fullname}</p>

      {
        currentStudent.comments.length > 0 &&
        <ul className='popup__list'>
          {
            currentStudent.comments.slice(0).reverse().map((elem, i) => (
              <li key={i} className='popup__item'>
                <div className='popup__item-container'>
                  <img className='popup__item-img' src={elem.author_avatar_link} alt='аватар автора комментария'></img>
                  <div className='popup__item-info'>
                    {renderComment(elem)}
                    <p className='popup__item-date'>Автор: {elem.author_fullname}</p>
                    <p className='popup__item-date'>Дата публикации: {elem.date}</p>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      }
      
      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Назад</button>
        <button className='popup__btn-save' type='button' onClick={() => onAddComment()}>Новый комментарий</button>
      </div>
    </Popup>
  )
}

export default TeacherViewCommentsPopup;