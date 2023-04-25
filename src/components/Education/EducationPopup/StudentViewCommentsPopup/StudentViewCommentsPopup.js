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
                <div className='popup__author'>
                  <img className='popup__author-img' src={elem.author_avatar_link} alt='аватар'></img>
                  <div className='popup__author-info'>
                    <h4 className='popup__author-title popup__author-title_font_small'>{elem.text}</h4>
                    <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Автор: </span>{elem.author_fullname}</p>
                    <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Дата публикации: </span>{elem.date}</p>
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