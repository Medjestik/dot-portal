import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './TeacherViewFilesPopup.css';

function TeacherViewFilesPopup({ isOpen, onClose, currentStudent, }) {

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <Popup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={'education-teacher-view-files-popup'}
    >
      <h2 className='popup__title'>Файлы, загруженные студентом ({currentStudent.files.length} шт.)</h2>
      <p className='popup__subtitle'>Студент: {currentStudent.student.fullname}</p>
      {
        currentStudent.files.length > 0 &&
        <ul className='popup__list'>
          {
            currentStudent.files.map((elem, i) => (
              <li key={i} className='popup__item'>
                <div className='popup__item-container'>
                  <span className='popup__item-count'>{i + 1}.</span>
                  <div className='popup__item-info'>
                    <h4 className='popup__item-name'>{elem.name}</h4>
                    <p className='popup__item-date'>Дата загрузки: {elem.date}</p>
                  </div>
                </div>
                <a className='btn btn_type_download btn_type_download_status_active btn_margin_zero' target='_blank' rel='noreferrer' href={elem.link}> </a>
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