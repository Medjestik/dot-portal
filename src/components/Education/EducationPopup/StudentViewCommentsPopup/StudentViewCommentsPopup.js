import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './StudentViewCommentsPopup.css';

function StudentViewCommentsPopup({ isOpen, onClose, comments, }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
    isOpen={isOpen}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'education-student-view-comments-popup'}
    >
      <h2 className='popup__title'>Комментарии по дисциплине</h2>

      {
        comments.length > 0 &&
        <ul className='popup__list'>
          {
            comments.slice(0).reverse().map((elem, i) => (
              <li key={i} className='popup__item'>
                <div className='popup__item-container'>
                  <img className='popup__item-img' src={elem.author_avatar_link} alt='аватар автора комментария'></img>
                  <div className='popup__item-info'>
                    <h4 className='popup__item-name'>{elem.text}</h4>
                    <p className='popup__item-date'>Автор: {elem.author_fullname}</p>
                    <p className='popup__item-date'>Дата публикации: {elem.date}</p>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      }

      <div className='popup__btn_margin_top'></div>
      
      <button className='popup__btn-back' type='submit'>Назад</button>
      
    </Popup>
  )
}

export default StudentViewCommentsPopup;