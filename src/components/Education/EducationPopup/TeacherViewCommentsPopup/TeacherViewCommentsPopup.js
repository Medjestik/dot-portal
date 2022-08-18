import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './TeacherViewCommentsPopup.css';

function TeacherViewCommentsPopup({ isOpen, onClose, currentStudent, }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'education-teacher-view-tests-popup'}
    >
      <h2 className='popup__title'>Комментарии для студента</h2>
      <p className='popup__subtitle'>Студент: {currentStudent.student.fullname}</p>

      {
        currentStudent.comments.length > 0 &&
        <ul className='popup__list'>
          {
            currentStudent.comments.map((elem, i) => (
              <li key={i} className='popup__item'>
                <div className='popup__item-container'>
                  <img className='popup__item-img' src={elem.author_avatar_link} alt='аватар автора комментария'></img>
                  <div className='popup__item-info'>
                    <h4 className='popup__item-name'>{elem.text}</h4>
                    <p className='popup__item-date'>Автор: {elem.author_fullname}</p>
                    <p className='popup__item-date'>Дата публицации: {elem.date}</p>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      }
      
      <button className='popup__btn-back' type='submit'>Назад</button>
    </Popup>
  )
}

export default TeacherViewCommentsPopup;