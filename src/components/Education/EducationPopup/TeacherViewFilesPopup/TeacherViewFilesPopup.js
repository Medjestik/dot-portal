import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './TeacherViewFilesPopup.css';

function TeacherViewFilesPopup({ isOpen, onClose, currentStudent, }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  console.log(currentStudent);

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'education-teacher-view-files-popup'}
    >
      <h2 className='popup__title'>Файлы, загруженные студентом ({currentStudent.files.length} шт.)</h2>
      <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Студент: </span>{currentStudent.student.fullname}</p>
      {
        currentStudent.files.length > 0 &&
        <ul className='popup__list'>
          {
            [...currentStudent.files].reverse().map((elem, i) => (
              <li key={i} className='popup__item'>
                <div className='popup__item-container'>
                  <a className='btn btn_type_download btn_type_download_status_active btn_margin_zero' target='_blank' rel='noreferrer' href={elem.link}> </a>
                  <div className='popup__item-info'>
                    <h4 className='popup__item-title'>{elem.name}</h4>
                    <p className='popup__item-text'><span className='popup__item-text_weight_bold'>Дата загрузки: </span>{elem.date}</p>
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

export default TeacherViewFilesPopup;