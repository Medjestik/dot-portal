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

  console.log(currentStudent);

  function renderComment(comment) {
    if (currentUser.id === comment.author_id) { 
      return (
        <h4 className='popup__author-title popup__author-title_font_small popup__author-title_type_active' onClick={() => onEditComment(comment)}>{comment.text}</h4>
      )
    } else {
      return (
        <h4 className='popup__author-title popup__author-title_font_small'>{comment.text}</h4>
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
      <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Студент: </span>{currentStudent.student.fullname}</p>

      {
        currentStudent.comments.length > 0 &&
        <ul className='popup__list'>
          {
            currentStudent.comments.slice(0).reverse().map((elem, i) => (
              <li key={i} className='popup__item'>
                <div className='popup__author'>
                  {
                  elem.author_avatar_link
                  ?
                  <img className='popup__author-img' src={elem.author_avatar_link} alt='аватар'></img>
                  :
                  <div className='popup__author-img'></div>
                  }
                  <div className='popup__author-info'>
                    {renderComment(elem)}
                    <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Автор: </span>{elem.author_fullname}</p>
                    <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Дата публикации: </span>{elem.date}</p>
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