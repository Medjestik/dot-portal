import React from 'react';
import Popup from '../../../Popup/Popup.js';
import './TeacherViewTestsPopup.css';
import TestChart from '../../../TestChart/TestChart.js';

function TeacherViewTestsPopup({ isOpen, onClose, currentStudent, }) {

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
      <h2 className='popup__title'>Тестирование студента ({currentStudent.learning.completed_tests_count}/{currentStudent.learning.total_tests_count})</h2>
      <p className='popup__author-text'><span className='popup__author-text_weight_bold'>Студент: </span>{currentStudent.student.fullname}</p>

      {
        currentStudent.learning.tests_info.length > 0 &&
        <ul className='popup__list'>
          {
            currentStudent.learning.tests_info.map((elem, i) => (
              <li key={i} className='popup__item'>
                <div className='popup__item-container'>
                  <TestChart test={elem} />
                  <div className='popup__item-info'>
                    <h4 className='popup__item-title'>{elem.name}</h4>
                    <p className='popup__item-text'><span className='popup__item-text_weight_bold'>Лучшая попытка: </span>{elem.score}/{elem.max_score}</p>
                    <p className='popup__item-text'><span className='popup__item-text_weight_bold'>Количество попыток: </span>{elem.attempts}</p>
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

export default TeacherViewTestsPopup;