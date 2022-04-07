import React from 'react';
import './DisciplineInfo.css';

function DisciplineInfo({ currentDiscipline, documents }) {

  return (
    <div className='discipline-info'>
      <div className='discipline-info__container'>
        <div className='discipline-info__teacher'>
          <div className='discipline-info__teacher-container'>
            <div className='discipline-info__teacher-img'></div>
            <div className='discipline-info__teacher-info'>
              <h3 className='discipline-info__teacher-name'>{currentDiscipline.disciplineTeacher}</h3>
              <ul className='discipline-info__teacher-info-list'>
                <li className='discipline-info__teacher-info-item'>
                  <p className='discipline-info__teacher-text'>Преподаватель</p>
                  <p className='discipline-info__teacher-text discipline-info__teacher-text_margin_top'>Доцент</p>
                </li>
                <li className='discipline-info__teacher-info-item'>
                  <p className='discipline-info__teacher-text'>+7 (000) 000-00-00</p>
                  <p className='discipline-info__teacher-text discipline-info__teacher-text_margin_top'>0000000000000@000000.ru</p>
                </li>
              </ul>
            </div>
          </div>
          <div className='discipline-info__teacher-comment'>
            <p className='discipline-info__teacher-comment-text'>Комментарий преподавателя</p>
          </div>
        </div>
        <div className='discipline-info__document'>
          <div className='discipline-info__table'>
            <div className='discipline-info__table-header'>
              <div className='discipline-info__table-main-row'>
                <div className='discipline-info__table-column discipline-info__table-count'>
                  <p className='discipline-info__table-text discipline-info__table-text_type_header'>№</p>
                </div>
                <div className='discipline-info__table-column discipline-info__table-date'>
                  <p className='discipline-info__table-text discipline-info__table-text_type_header'>Дата</p>
                </div>
                <div className='discipline-info__table-column discipline-info__table-name'>
                  <p className='discipline-info__table-text discipline-info__table-text_type_header'>Наименование</p>
                </div>
              </div>
              <div className='discipline-info__table-sub-row'>
                <div className='discipline-info__table-btn discipline-info__table-btn_type_header'>
                </div>
              </div>
            </div>
            <ul className='discipline-info__table-main scroll'>
              {
                documents.map((item, i) => (
                  <li className='discipline-info__table-row'>
                    <div className='discipline-info__table-main-row'>
                      <div className='discipline-info__table-column discipline-info__table-count'>
                        <p className='discipline-info__table-text'>{i + 1}</p>
                      </div>
                      <div className='discipline-info__table-column discipline-info__table-date'>
                        <p className='discipline-info__table-text'>{item.date}</p>
                      </div>
                      <div className='discipline-info__table-column discipline-info__table-name'>
                        <p className='discipline-info__table-text'>{item.title}</p>
                      </div>
                    </div>
                    <div className='discipline-info__table-sub-row'>
                      <div className='discipline-info__table-btn'>
                        <button className='btn btn_type_download btn_type_download_status_active discipline-info__table-btn-download'></button>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>

          </div>
        </div>

      </div>
     
    </div>
  );
}

export default DisciplineInfo; 